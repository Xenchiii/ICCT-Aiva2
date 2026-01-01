-- ==============================================
-- FIXED SCHEMA FOR AUTH SYSTEM
-- ==============================================
-- Users table (Fixed to match frontend expectations)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- Changed from password_hash to password (backend should hash this)
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
  bio TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  studentNo TEXT,  -- Changed from student_no to match frontend
  course TEXT,
  teacherNo TEXT,  -- Changed from teacher_no to match frontend
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Classes table (with video columns already included)
CREATE TABLE IF NOT EXISTS classes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  schedule TEXT,
  description TEXT,
  room TEXT,
  teacher_id TEXT NOT NULL,
  student_count INTEGER DEFAULT 0,
  duration INTEGER DEFAULT 60,
  meeting_id VARCHAR(100),
  meeting_link TEXT,
  is_live BOOLEAN DEFAULT 0,
  last_session_start DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

-- Class sessions table
CREATE TABLE IF NOT EXISTS class_sessions (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL,
  started_at DATETIME,
  ended_at DATETIME,
  duration_minutes INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Session participants table
CREATE TABLE IF NOT EXISTS session_participants (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  joined_at DATETIME,
  left_at DATETIME,
  is_muted BOOLEAN DEFAULT 0,
  is_camera_off BOOLEAN DEFAULT 0,
  FOREIGN KEY (session_id) REFERENCES class_sessions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Class messages table
CREATE TABLE IF NOT EXISTS class_messages (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL,
  session_id TEXT,
  user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (session_id) REFERENCES class_sessions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  class_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  class_id TEXT NOT NULL,
  teacher_id TEXT NOT NULL,
  due_date DATETIME,
  points INTEGER DEFAULT 100,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  points_required INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Badges table (earned badges)
CREATE TABLE IF NOT EXISTS user_badges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (badge_id) REFERENCES badges(id)
);

-- Educational Games/Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK(difficulty IN ('easy', 'medium', 'hard')),
  category TEXT DEFAULT 'game',
  icon TEXT,
  xp_reward INTEGER DEFAULT 50,
  time_limit INTEGER,
  question_count INTEGER DEFAULT 10,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Challenge Progress
CREATE TABLE IF NOT EXISTS user_challenges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  challenge_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT 0,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (challenge_id) REFERENCES challenges(id)
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  cost INTEGER NOT NULL,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Rewards (purchased)
CREATE TABLE IF NOT EXISTS user_rewards (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  reward_id TEXT NOT NULL,
  purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (reward_id) REFERENCES rewards(id)
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  type TEXT,
  file_url TEXT,
  uploaded_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ==============================================
-- EDUCATIONAL GAMES DATA
-- ==============================================

-- ACCOUNTANCY GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('acc_easy_1', 'Balance Sheet Basics', 'Learn the fundamentals of balance sheets and accounting equations', 'Accountancy', 'easy', '📊', 30, 300, 10),
('acc_easy_2', 'Journal Entry Practice', 'Master basic journal entries for common transactions', 'Accountancy', 'easy', '📝', 35, 300, 10),
('acc_easy_3', 'Account Types Quiz', 'Identify different types of accounts: assets, liabilities, equity', 'Accountancy', 'easy', '💰', 40, 300, 10),

('acc_med_1', 'Trial Balance Challenge', 'Prepare and balance trial balance statements', 'Accountancy', 'medium', '⚖️', 60, 600, 15),
('acc_med_2', 'Adjusting Entries Master', 'Work through complex adjusting entries scenarios', 'Accountancy', 'medium', '🔧', 70, 600, 15),
('acc_med_3', 'Financial Statement Analysis', 'Analyze and interpret financial statements', 'Accountancy', 'medium', '📈', 80, 600, 15),

('acc_hard_1', 'Advanced Consolidation', 'Master consolidated financial statements', 'Accountancy', 'hard', '🏢', 120, 900, 20),
('acc_hard_2', 'Complex Tax Accounting', 'Navigate complex tax accounting scenarios', 'Accountancy', 'hard', '💼', 150, 900, 20),
('acc_hard_3', 'Forensic Accounting Case', 'Solve forensic accounting investigations', 'Accountancy', 'hard', '🔍', 200, 900, 20);

-- INFORMATION TECHNOLOGY GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('it_easy_1', 'Binary Number Basics', 'Convert between binary, decimal, and hexadecimal', 'Information Technology', 'easy', '🔢', 30, 300, 10),
('it_easy_2', 'HTML Tag Master', 'Learn and identify essential HTML tags', 'Information Technology', 'easy', '🏷️', 35, 300, 10),
('it_easy_3', 'Computer Parts Quiz', 'Identify computer hardware components and their functions', 'Information Technology', 'easy', '💻', 40, 300, 10),

('it_med_1', 'Algorithm Design', 'Design and optimize basic algorithms', 'Information Technology', 'medium', '⚙️', 60, 600, 15),
('it_med_2', 'Database Normalization', 'Practice database normalization techniques', 'Information Technology', 'medium', '🗄️', 70, 600, 15),
('it_med_3', 'Network Configuration', 'Configure and troubleshoot network setups', 'Information Technology', 'medium', '🌐', 80, 600, 15),

('it_hard_1', 'Advanced Data Structures', 'Implement complex data structures and algorithms', 'Information Technology', 'hard', '🧮', 120, 900, 20),
('it_hard_2', 'Cybersecurity Challenge', 'Identify and prevent security vulnerabilities', 'Information Technology', 'hard', '🔒', 150, 900, 20),
('it_hard_3', 'System Architecture Design', 'Design scalable system architectures', 'Information Technology', 'hard', '🏗️', 200, 900, 20);

-- BUSINESS GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('bus_easy_1', 'Business Terms 101', 'Learn fundamental business vocabulary and concepts', 'Business', 'easy', '📚', 30, 300, 10),
('bus_easy_2', 'Marketing Basics', 'Understand the 4 Ps of marketing', 'Business', 'easy', '📢', 35, 300, 10),
('bus_easy_3', 'Supply and Demand', 'Master basic economic principles', 'Business', 'easy', '📊', 40, 300, 10),

('bus_med_1', 'SWOT Analysis Practice', 'Conduct SWOT analysis for business scenarios', 'Business', 'medium', '🎯', 60, 600, 15),
('bus_med_2', 'Financial Forecasting', 'Create and analyze financial projections', 'Business', 'medium', '📈', 70, 600, 15),
('bus_med_3', 'Business Strategy Case', 'Develop competitive business strategies', 'Business', 'medium', '♟️', 80, 600, 15),

('bus_hard_1', 'International Trade', 'Navigate complex international business scenarios', 'Business', 'hard', '🌍', 120, 900, 20),
('bus_hard_2', 'M&A Case Study', 'Analyze mergers and acquisitions', 'Business', 'hard', '🤝', 150, 900, 20),
('bus_hard_3', 'Corporate Restructuring', 'Solve complex organizational challenges', 'Business', 'hard', '🏛️', 200, 900, 20);

-- CRIMINOLOGY GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('crim_easy_1', 'Crime Types Quiz', 'Identify and classify different types of crimes', 'Criminology', 'easy', '🚨', 30, 300, 10),
('crim_easy_2', 'Criminal Justice System', 'Learn the basics of the criminal justice process', 'Criminology', 'easy', '⚖️', 35, 300, 10),
('crim_easy_3', 'Law Enforcement Basics', 'Understand fundamental law enforcement procedures', 'Criminology', 'easy', '👮', 40, 300, 10),

('crim_med_1', 'Crime Scene Investigation', 'Analyze crime scenes and gather evidence', 'Criminology', 'medium', '🔍', 60, 600, 15),
('crim_med_2', 'Forensic Evidence Analysis', 'Interpret forensic evidence in criminal cases', 'Criminology', 'medium', '🧪', 70, 600, 15),
('crim_med_3', 'Criminal Profiling', 'Develop criminal profiles based on evidence', 'Criminology', 'medium', '👤', 80, 600, 15),

('crim_hard_1', 'Cold Case Investigation', 'Solve complex cold case scenarios', 'Criminology', 'hard', '❄️', 120, 900, 20),
('crim_hard_2', 'Legal Procedures Expert', 'Navigate complex legal procedures and case law', 'Criminology', 'hard', '📜', 150, 900, 20),
('crim_hard_3', 'Terrorism & Security', 'Analyze counter-terrorism strategies', 'Criminology', 'hard', '🛡️', 200, 900, 20);

-- HISTORY GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('hist_easy_1', 'Philippine History 101', 'Learn key events in Philippine history', 'History', 'easy', '🇵🇭', 30, 300, 10),
('hist_easy_2', 'World War Timeline', 'Place major WWII events in chronological order', 'History', 'easy', '⚔️', 35, 300, 10),
('hist_easy_3', 'Historical Figures', 'Identify important historical personalities', 'History', 'easy', '👑', 40, 300, 10),

('hist_med_1', 'Colonial Period Analysis', 'Analyze the impact of colonialism', 'History', 'medium', '🏰', 60, 600, 15),
('hist_med_2', 'Revolutionary Movements', 'Study major revolutionary movements worldwide', 'History', 'medium', '✊', 70, 600, 15),
('hist_med_3', 'Primary Source Analysis', 'Interpret historical primary sources', 'History', 'medium', '📜', 80, 600, 15),

('hist_hard_1', 'Historiography Expert', 'Master different historical interpretations', 'History', 'hard', '📖', 120, 900, 20),
('hist_hard_2', 'Comparative Civilizations', 'Compare and contrast major civilizations', 'History', 'hard', '🏛️', 150, 900, 20),
('hist_hard_3', 'Historical Research Case', 'Conduct complex historical research', 'History', 'hard', '🔬', 200, 900, 20);

-- BIOLOGY GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('bio_easy_1', 'Cell Biology Basics', 'Learn the structure and function of cells', 'Biology', 'easy', '🔬', 30, 300, 10),
('bio_easy_2', 'Body Systems Quiz', 'Identify major organ systems and functions', 'Biology', 'easy', '🫀', 35, 300, 10),
('bio_easy_3', 'Plant vs Animal Cells', 'Compare and contrast cell types', 'Biology', 'easy', '🌱', 40, 300, 10),

('bio_med_1', 'Genetics and DNA', 'Understand inheritance and genetic principles', 'Biology', 'medium', '🧬', 60, 600, 15),
('bio_med_2', 'Photosynthesis Process', 'Master the photosynthesis cycle', 'Biology', 'medium', '☀️', 70, 600, 15),
('bio_med_3', 'Evolutionary Biology', 'Study evolution and natural selection', 'Biology', 'medium', '🦎', 80, 600, 15),

('bio_hard_1', 'Molecular Biology', 'Master complex molecular processes', 'Biology', 'hard', '⚗️', 120, 900, 20),
('bio_hard_2', 'Advanced Genetics', 'Solve complex genetic problems', 'Biology', 'hard', '🧪', 150, 900, 20),
('bio_hard_3', 'Biotechnology Applications', 'Apply biotechnology concepts to real scenarios', 'Biology', 'hard', '🔭', 200, 900, 20);

-- CALCULUS GAMES (9 games)
INSERT OR IGNORE INTO challenges (id, title, description, subject, difficulty, icon, xp_reward, time_limit, question_count) VALUES
('calc_easy_1', 'Limits Fundamentals', 'Calculate basic limits and understand continuity', 'Calculus', 'easy', '∞', 30, 300, 10),
('calc_easy_2', 'Derivative Basics', 'Find derivatives of simple functions', 'Calculus', 'easy', '📐', 35, 300, 10),
('calc_easy_3', 'Integration Intro', 'Solve basic integration problems', 'Calculus', 'easy', '∫', 40, 300, 10),

('calc_med_1', 'Chain Rule Master', 'Apply chain rule to complex functions', 'Calculus', 'medium', '⛓️', 60, 600, 15),
('calc_med_2', 'Optimization Problems', 'Solve real-world optimization scenarios', 'Calculus', 'medium', '📈', 70, 600, 15),
('calc_med_3', 'Integration Techniques', 'Master substitution and integration by parts', 'Calculus', 'medium', '🔧', 80, 600, 15),

('calc_hard_1', 'Multivariable Calculus', 'Work with functions of multiple variables', 'Calculus', 'hard', '🌐', 120, 900, 20),
('calc_hard_2', 'Differential Equations', 'Solve complex differential equations', 'Calculus', 'hard', '∂', 150, 900, 20),
('calc_hard_3', 'Vector Calculus', 'Master gradient, divergence, and curl', 'Calculus', 'hard', '➡️', 200, 900, 20);

-- ==============================================
-- INDEXES FOR PERFORMANCE
-- ==============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_class_id ON class_sessions(class_id);
CREATE INDEX IF NOT EXISTS idx_session_participants_session_id ON session_participants(session_id);
CREATE INDEX IF NOT EXISTS idx_class_messages_class_id ON class_messages(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_class ON assignments(class_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_subject ON challenges(subject);
CREATE INDEX IF NOT EXISTS idx_challenges_difficulty ON challenges(difficulty);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

-- ==============================================
-- SAMPLE BADGES
-- ==============================================
INSERT OR IGNORE INTO badges (id, name, description, icon, category, points_required) VALUES
('badge_1', 'First Steps', 'Complete your first challenge', '🎯', 'achievement', 0),
('badge_2', 'Quick Learner', 'Earn 100 XP', '⚡', 'progress', 100),
('badge_3', 'Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak', 0),
('badge_4', 'Scholar', 'Earn 500 XP', '📚', 'progress', 500),
('badge_5', 'Game Master', 'Complete 10 games', '🎮', 'achievement', 0),
('badge_6', 'Perfect Score', 'Get 100% on any challenge', '💯', 'achievement', 0),
('badge_7', 'Subject Expert', 'Complete all challenges in one subject', '🏆', 'achievement', 0),
('badge_8', 'Champion', 'Reach level 10', '👑', 'progress', 1000),
('badge_9', 'Dedicated', 'Maintain a 30-day streak', '💪', 'streak', 0),
('badge_10', 'Master', 'Complete all hard challenges', '🌟', 'achievement', 0);

-- ==============================================
-- SAMPLE REWARDS
-- ==============================================
INSERT OR IGNORE INTO rewards (id, name, description, icon, cost, category) VALUES
('reward_1', 'Custom Avatar Frame', 'Unlock a special avatar border', '🖼️', 100, 'cosmetic'),
('reward_2', 'Profile Theme', 'Change your profile color scheme', '🎨', 150, 'cosmetic'),
('reward_3', '2x XP Boost (1 Hour)', 'Double XP for 1 hour', '⚡', 200, 'boost'),
('reward_4', 'Hint Token', 'Get a hint on any question', '💡', 50, 'power-up'),
('reward_5', 'Skip Challenge', 'Skip one challenge requirement', '⏭️', 300, 'power-up'),
('reward_6', 'Custom Title', 'Create a custom profile title', '✨', 500, 'cosmetic'),
('reward_7', 'Freeze Streak', 'Protect your streak for 3 days', '🧊', 250, 'insurance'),
('reward_8', 'VIP Badge', 'Show off your VIP status', '💎', 1000, 'cosmetic'),
('reward_9', '3x XP Boost (30 min)', 'Triple XP for 30 minutes', '🚀', 350, 'boost'),
('reward_10', 'Legendary Frame', 'Exclusive legendary avatar frame', '👑', 2000, 'cosmetic');
