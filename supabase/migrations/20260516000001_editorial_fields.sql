-- Add editorial fields to experiences table
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS is_case BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS case_result TEXT;

-- Add editorial fields to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS brand VARCHAR(20);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_subtitle TEXT;
