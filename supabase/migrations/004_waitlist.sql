-- ============================================================================
-- Waitlist table (for /waitlist pre-launch email capture)
-- Run this migration if you want the waitlist feature enabled.
-- The /waitlist page is env-gated (NEXT_PUBLIC_WAITLIST_ENABLED) and the
-- /api/waitlist endpoint is a no-op when DATABASE_URL is missing.
-- ============================================================================

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  referrer VARCHAR(500),
  user_agent VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at);

-- ============================================================================
-- RLS — waitlist is server-only, no public reads
-- Service role (used by /api/waitlist) bypasses RLS, but we lock the table
-- down for the anon and authenticated roles in case anyone hits the public
-- schema directly.
-- ============================================================================

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- No policies: anon and authenticated get zero access. The API route uses the
-- service-role Drizzle client at src/db/index.ts, which bypasses RLS.
