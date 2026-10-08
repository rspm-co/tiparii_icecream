-- Run this once in hPanel phpMyAdmin if you already imported database/schema.sql.
ALTER TABLE leads MODIFY investment_budget VARCHAR(80) NULL;
