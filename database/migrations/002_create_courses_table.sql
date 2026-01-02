CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL, -- e.g. "CS 101"
  name TEXT NOT NULL, -- e.g. "Intro to Computing"
  description TEXT,
  units INTEGER DEFAULT 3,
  schedule TEXT,      -- e.g. "MWF 10:00 AM - 11:00 AM"
  professor_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professor_id) REFERENCES users(id)
);