/**
 * Next.js 16+ Proxy (formerly Middleware)
 * Handles authentication and session management for protected routes
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_WEBHOOK_PATHS = new Set<string>([
  "/api/stripe/webhook",
  "/api/lemonsqueezy/webhook",
  "/api/mailgun/webhook",
  "/api/mailgun",
  "/api/auth/webhook",
  "/api/waitlist",
  "/api/unsubscribe",
  "/api/health",
]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Short-circuit public webhooks BEFORE calling Supabase.
  // These endpoints verify their own HMAC / signature and must respond
  // quickly (Stripe / LS expect <5s). They never need a Supabase session.
  if (PUBLIC_WEBHOOK_PATHS.has(pathname)) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options: CookieOptions;
          }>
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  // This refreshes the session and is critical for proper authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/confirm",
    "/pricing",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/tos",
    "/docs",
    "/changelog",
    "/rss.xml",
    "/playground",
    "/waitlist",
  ];

  // Check if current path is public
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicRoutes.some((route) => pathname.startsWith(route + "/"));

  // Allow access to public routes
  if (isPublicRoute) {
    return supabaseResponse;
  }

  // Redirect unauthenticated users to login
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // User is authenticated, allow access
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Static assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
