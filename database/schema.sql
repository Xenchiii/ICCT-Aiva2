-- ICCT Aiva System - Master Database Schema

-- 1. USERS TABLE
-- Handles Role-Based Access Control (Student, Professor, Admin, Officer)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK(role IN ('Student', 'Professor', 'Admin', 'Officer')) DEFAULT 'Student',
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. COURSES TABLE
-- Subjects that students enroll in
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
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

-- 3. GRADES TABLE
-- Supports the Philippine Grading System (1.0 - 5.0) and Components
DROP TABLE IF EXISTS grades;
CREATE TABLE grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  component TEXT NOT NULL, -- e.g., "Midterm Exam", "Quiz 1"
  score REAL NOT NULL,     -- Raw score (e.g., 85)
  max_score REAL NOT NULL, -- Total possible (e.g., 100)
  weight REAL NOT NULL,    -- Percentage weight (e.g., 20.0 for 20%)
  term TEXT DEFAULT '1st Sem',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- 4. INQUIRIES TABLE
-- Support tickets with Priorities and Categories
DROP TABLE IF EXISTS inquiries;
CREATE TABLE inquiries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT CHECK(category IN ('Academic', 'Technical', 'Administrative', 'Behavioral', 'General')) NOT NULL,
  priority TEXT CHECK(priority IN ('Low', 'Medium', 'High', 'Urgent')) DEFAULT 'Medium',
  status TEXT CHECK(status IN ('Open', 'Pending', 'Resolved', 'Closed')) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. NOTIFICATIONS TABLE
-- Real-time alerts for the student dashboard
DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  is_read BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);