/**
 * Health Check Endpoint
 *
 * Used by Docker health checks and monitoring tools to verify the
 * application is running AND can reach the database. Returns 200 with
 * {status: "ok"} when healthy, 503 with {status: "degraded"} when the
 * database is unreachable so the load balancer can take this instance
 * out of rotation.
 */

import { sql } from "drizzle-orm";
import { db } from "@/db";
import { isShowcaseMode } from "@/lib/env-validation";

// Health checks must run on every request so we always see the current
// DB state. Disable build-time page data collection.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  // Showcase deployments have no database by design - report alive so
  // hosting uptime checks do not fail a frontend-only demo.
  if (isShowcaseMode()) {
    return Response.json(
      {
        status: "showcase",
        timestamp: new Date().toISOString(),
        service: "ShipSaaS",
        checks: { database: { ok: false, note: "SHOWCASE_MODE=true" } },
      },
      { status: 200 }
    );
  }

  let dbOk = true;
  let dbError: string | undefined;

  try {
    await db.execute(sql`SELECT 1`);
  } catch (error) {
    dbOk = false;
    dbError = error instanceof Error ? error.message : "Unknown error";
  }

  if (!dbOk) {
    return Response.json(
      {
        status: "degraded",
        timestamp: new Date().toISOString(),
        service: "ShipSaaS",
        checks: { database: { ok: false, error: dbError } },
      },
      { status: 503 }
    );
  }

  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "ShipSaaS",
    checks: { database: { ok: true } },
  });
}
