-- ============================================================================
-- Email log table
--
-- One row per transactional email send. Updated by:
--   - src/lib/mailgun.ts                (writes a row on every send)
--   - src/app/api/mailgun/webhook/route (updates status on delivery events:
--                                          delivered, bounced, complained,
--                                          unsubscribed, failed)
--
-- Soft FK to users.id (no ON DELETE CASCADE) so the log survives user
-- hard-deletion for audit / debugging.
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_email VARCHAR(255) NOT NULL,
  to_user_id UUID,
  subject VARCHAR(500) NOT NULL,
  template VARCHAR(100) NOT NULL,
  provider VARCHAR(50) NOT NULL DEFAULT 'mailgun',
  provider_message_id VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'sent',
  failure_reason TEXT,
  tags JSONB,
  metadata JSONB,
  sent_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_event_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS email_log_to_email_idx ON email_log (to_email);
CREATE INDEX IF NOT EXISTS email_log_to_user_idx ON email_log (to_user_id);
CREATE INDEX IF NOT EXISTS email_log_provider_message_idx
  ON email_log (provider_message_id);
CREATE INDEX IF NOT EXISTS email_log_status_idx ON email_log (status);
CREATE INDEX IF NOT EXISTS email_log_sent_at_idx ON email_log (sent_at);

-- ============================================================================
-- RLS — email_log is server-only.
-- Service role (Drizzle admin client) bypasses RLS. Anon and authenticated
-- have no access; this is a write-only log from the app's perspective.
-- ============================================================================

ALTER TABLE email_log ENABLE ROW LEVEL SECURITY;
