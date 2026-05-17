-- Add dedicated body text for Case editorial section
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS case_body TEXT;
