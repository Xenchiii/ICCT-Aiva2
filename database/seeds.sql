-- 1. Insert Test Users (Password is 'password123' hashed - example only)
INSERT INTO users (id, email, password_hash, full_name, role) VALUES 
('admin-01', 'admin@icct.edu.ph', '$2b$10$EpOd/..', 'System Admin', 'Admin'),
('prof-01', 'prof.cruz@icct.edu.ph', '$2b$10$EpOd/..', 'Juan Cruz', 'Professor'),
('stud-01', 'student@icct.edu.ph', '$2b$10$EpOd/..', 'Maria Santos', 'Student');

-- 2. Insert a Course
INSERT INTO courses (id, code, name, units, professor_id) VALUES 
('course-01', 'CS 101', 'Introduction to Computing', 3, 'prof-01');

-- 3. Insert a Sample Inquiry
INSERT INTO inquiries (id, user_id, subject, message, category, priority) VALUES 
('ticket-01', 'stud-01', 'Grade Correction', 'My midterm grade is missing.', 'Academic', 'High');