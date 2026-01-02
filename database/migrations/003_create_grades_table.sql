CREATE TABLE IF NOT EXISTS grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  component TEXT NOT NULL, -- e.g., "Midterm Exam", "Quiz 1", "Recitation"
  score REAL NOT NULL,     -- Raw score (e.g., 85)
  max_score REAL NOT NULL, -- Total possible (e.g., 100)
  weight REAL NOT NULL,    -- Percentage weight (e.g., 20.0 for 20%)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);