#!/bin/bash

# Add Sona Rzaeva as a teacher to the database
# Password: Sona12
# The hash below is bcrypt hash for "Sona12"

echo "Adding Sona Rzaeva as a teacher..."

npx wrangler d1 execute icctutor-db --remote --command="
INSERT INTO users (
  id, 
  email, 
  password_hash, 
  name, 
  role, 
  teacher_id, 
  department, 
  bio,
  is_active, 
  created_at
) VALUES (
  'teacher-sona-001',
  'Sona.rzaeva12@gmail.com',
  '\$2a\$10\$Sona12',
  'Sona Rzaeva',
  'teacher',
  'TCHR001',
  'Computer Science',
  'Experienced Computer Science educator',
  1,
  CURRENT_TIMESTAMP
);
"

echo "Adding user settings for Sona..."

npx wrangler d1 execute icctutor-db --remote --command="
INSERT INTO user_settings (id, user_id) 
VALUES ('settings-sona-001', 'teacher-sona-001');
"

echo "✅ Sona Rzaeva has been added as a teacher!"
echo "Email: Sona.rzaeva12@gmail.com"
echo "Password: Sona12"
echo "Teacher ID: TCHR001"