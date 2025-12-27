import bcrypt from 'bcryptjs';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Helper function to generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Helper to create JSON response
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Middleware to verify JWT token
async function verifyToken(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

// Generate JWT token
function generateToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 86400000
  }));
  return `${header}.${payload}.signature`;
}

// Helper function to calculate time ago
function getTimeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// Main handler
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, '') || '/';

  console.log(`[${new Date().toISOString()}] ${request.method} ${path}`);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ==================== AUTH ENDPOINTS ====================
    
    if (path === '/auth/register' && request.method === 'POST') {
      const body = await request.json();
      const { email, password, name, role, studentNo, teacherNo, department, course } = body;

      console.log('Registration attempt:', { email, role, studentNo, teacherNo });

      if (!email || !password || !name || !role) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      if (role === 'student' && studentNo) {
        if (!/^UA\d{9}$/.test(studentNo)) {
          return jsonResponse({ error: 'Invalid student number format. Example: UA202301234' }, 400);
        }
      }

      const existingUser = await env.DB.prepare(
        'SELECT id FROM users WHERE email = ? OR (student_no = ? AND student_no IS NOT NULL) OR (teacher_no = ? AND teacher_no IS NOT NULL)'
      ).bind(email, studentNo || null, teacherNo || null).first();

      if (existingUser) {
        return jsonResponse({ error: 'User already exists with this email, student number, or teacher ID' }, 409);
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const userId = generateUUID();

      await env.DB.prepare(`
        INSERT INTO users (id, email, password_hash, name, role, student_no, teacher_no, course, points, level, streak)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1, 0)
      `).bind(userId, email, passwordHash, name, role, studentNo || null, teacherNo || null, course || null).run();

      const token = generateToken({ id: userId, email, role });
      const user = { id: userId, email, name, role, student_no: studentNo, teacher_no: teacherNo, course, points: 0, level: 1, streak: 0, avatar_url: '' };

      console.log('Registration successful:', userId);
      return jsonResponse({ user, token }, 201);
    }

    if (path === '/auth/login' && request.method === 'POST') {
      const body = await request.json();
      const { email, password, role } = body;

      console.log('Login attempt:', { email, role });

      if (!email || !password) {
        return jsonResponse({ error: 'Missing credentials' }, 400);
      }

      if (role === 'admin' && email === 'Admin@TutorLink.ph' && password === 'Admin13') {
        const adminUser = {
          id: 'admin-system',
          email: 'Admin@TutorLink.ph',
          name: 'System Administrator',
          role: 'admin',
          points: 0,
          level: 99,
          streak: 0,
          avatar_url: ''
        };
        const token = generateToken(adminUser);
        console.log('Admin login successful');
        return jsonResponse({ user: adminUser, token });
      }

      const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
      
      if (!user) {
        console.log('User not found:', email);
        return jsonResponse({ error: 'Invalid credentials' }, 401);
      }

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        console.log('Invalid password for user:', email);
        return jsonResponse({ error: 'Invalid credentials' }, 401);
      }

      await env.DB.prepare('UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(user.id).run();

      const token = generateToken(user);
      const { password_hash, ...userWithoutPassword } = user;
      
      console.log('Login successful:', user.id);
      return jsonResponse({ user: userWithoutPassword, token });
    }

    // ==================== GOOGLE AUTH ENDPOINT ====================

    if (path === '/auth/google' && request.method === 'POST') {
      const body = await request.json();
      const { googleToken, email, name, picture } = body;

      console.log('Google OAuth attempt:', { email, name });

      if (!email || !googleToken) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      try {
        let user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();

        if (!user) {
          // Create new user from Google sign-in
          const userId = generateUUID();
          const defaultPassword = await bcrypt.hash(googleToken.substring(0, 20), 10);

          await env.DB.prepare(`
            INSERT INTO users (id, email, password_hash, name, avatar_url, role, points, level, streak, created_at)
            VALUES (?, ?, ?, ?, ?, 'student', 0, 1, 0, CURRENT_TIMESTAMP)
          `).bind(userId, email, defaultPassword, name, picture || '').run();

          user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
          console.log('New user created from Google OAuth:', userId);
        } else {
          // Update avatar if provided
          if (picture && !user.avatar_url) {
            await env.DB.prepare('UPDATE users SET avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
              .bind(picture, user.id).run();
          }
          console.log('Existing user logged in via Google:', user.id);
        }

        const token = generateToken(user);
        const { password_hash, ...userWithoutPassword } = user;

        return jsonResponse({ 
          user: { ...userWithoutPassword, avatar_url: picture || user.avatar_url },
          token 
        }, 201);

      } catch (error) {
        console.error('Google auth error:', error);
        return jsonResponse({ error: 'Google authentication failed' }, 500);
      }
    }

    // ==================== USER ENDPOINTS ====================

    if (path === '/users/me' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth) return jsonResponse({ error: 'Unauthorized' }, 401);

      if (auth.userId === 'admin-system') {
        return jsonResponse({
          id: 'admin-system',
          email: 'Admin@TutorLink.ph',
          name: 'System Administrator',
          role: 'admin',
          points: 0,
          level: 99,
          streak: 0,
          avatar_url: ''
        });
      }

      const user = await env.DB.prepare('SELECT * FROM users WHERE id = ?').bind(auth.userId).first();
      if (!user) return jsonResponse({ error: 'User not found' }, 404);

      const { password_hash, ...userWithoutPassword } = user;
      return jsonResponse(userWithoutPassword);
    }

    if (path === '/users/me' && request.method === 'PUT') {
      const auth = await verifyToken(request);
      if (!auth) return jsonResponse({ error: 'Unauthorized' }, 401);

      const body = await request.json();
      const { name, bio, avatar_url, points, level, streak } = body;

      await env.DB.prepare(`
        UPDATE users 
        SET name = COALESCE(?, name),
            bio = COALESCE(?, bio),
            avatar_url = COALESCE(?, avatar_url),
            points = COALESCE(?, points),
            level = COALESCE(?, level),
            streak = COALESCE(?, streak),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(name, bio, avatar_url, points, level, streak, auth.userId).run();

      return jsonResponse({ message: 'User updated successfully' });
    }

    // ==================== BADGE ENDPOINTS ====================

    if (path === '/badges' && request.method === 'GET') {
      const auth = await verifyToken(request);
      
      if (auth) {
        const badges = await env.DB.prepare(`
          SELECT b.*, 
                 CASE WHEN ub.id IS NOT NULL THEN 1 ELSE 0 END as earned
          FROM badges b
          LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?
          ORDER BY b.category, b.name
        `).bind(auth.userId).all();
        
        return jsonResponse(badges.results || []);
      } else {
        const badges = await env.DB.prepare('SELECT *, 0 as earned FROM badges ORDER BY category, name').all();
        return jsonResponse(badges.results || []);
      }
    }

    // ==================== CHALLENGE ENDPOINTS ====================

    if (path === '/challenges' && request.method === 'GET') {
      const auth = await verifyToken(request);
      
      if (auth) {
        const challenges = await env.DB.prepare(`
          SELECT c.*, 
                 COALESCE(uc.progress, 0) as progress,
                 COALESCE(uc.completed, 0) as completed
          FROM challenges c
          LEFT JOIN user_challenges uc ON c.id = uc.challenge_id AND uc.user_id = ?
          ORDER BY c.created_at DESC
        `).bind(auth.userId).all();
        
        return jsonResponse(challenges.results || []);
      } else {
        const challenges = await env.DB.prepare(
          'SELECT *, 0 as progress, 0 as completed FROM challenges ORDER BY created_at DESC'
        ).all();
        return jsonResponse(challenges.results || []);
      }
    }

    // ==================== REWARD ENDPOINTS ====================

    if (path === '/rewards' && request.method === 'GET') {
      const rewards = await env.DB.prepare('SELECT * FROM rewards ORDER BY cost ASC').all();
      return jsonResponse(rewards.results || []);
    }

    // ==================== TEACHER ENDPOINTS ====================

    if (path === '/teachers' && request.method === 'GET') {
      const teachers = await env.DB.prepare(`
        SELECT u.id, u.name, u.email, u.bio, u.avatar_url, u.teacher_no,
               COUNT(DISTINCT c.id) as course_count,
               COUNT(DISTINCT e.student_id) as student_count
        FROM users u
        LEFT JOIN classes c ON u.id = c.teacher_id
        LEFT JOIN enrollments e ON c.id = e.class_id
        WHERE u.role = 'teacher'
        GROUP BY u.id
        ORDER BY u.name
      `).all();

      return jsonResponse(teachers.results || []);
    }

    if (path === '/teacher/students' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || (auth.role !== 'teacher' && auth.role !== 'admin')) {
        return jsonResponse({ error: 'Unauthorized' }, 403);
      }

      const students = await env.DB.prepare(`
        SELECT DISTINCT u.id, u.name, u.email, u.student_no, u.course, u.points, u.level, u.avatar_url,
               u.created_at as joinDate,
               COALESCE((SELECT COUNT(*) FROM user_challenges uc WHERE uc.user_id = u.id AND uc.completed = 1), 0) * 10 as progress,
               ROUND(CAST(u.points AS REAL) / 250.0, 2) as gpa,
               90 as attendance
        FROM users u
        WHERE u.role = 'student'
        ORDER BY u.name
      `).all();

      return jsonResponse(students.results || []);
    }

    if (path === '/teacher/classes' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || (auth.role !== 'teacher' && auth.role !== 'admin')) {
        return jsonResponse({ error: 'Unauthorized' }, 403);
      }

      let query = `
        SELECT c.*, 
               u.name as teacher_name,
               COUNT(DISTINCT e.student_id) as student_count
        FROM classes c
        LEFT JOIN users u ON c.teacher_id = u.id
        LEFT JOIN enrollments e ON c.id = e.class_id
        WHERE 1=1
      `;

      if (auth.role === 'teacher') {
        query += ` AND c.teacher_id = ?`;
      }

      query += ` GROUP BY c.id ORDER BY c.created_at DESC`;

      const classes = auth.role === 'teacher' 
        ? await env.DB.prepare(query).bind(auth.userId).all()
        : await env.DB.prepare(query).all();

      return jsonResponse(classes.results || []);
    }

    if (path === '/teacher/classes' && request.method === 'POST') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'teacher') return jsonResponse({ error: 'Unauthorized' }, 403);

      const body = await request.json();
      const { title, subject, code, schedule, description, room, duration, meeting_id, meeting_link, is_live } = body;

      if (!title || !subject || !schedule) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      const classId = generateUUID();
      const classCode = code || `${subject.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

      await env.DB.prepare(`
        INSERT INTO classes (id, teacher_id, title, subject, code, description, schedule, room, duration, meeting_id, meeting_link, is_live, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        classId, 
        auth.userId, 
        title, 
        subject, 
        classCode, 
        description, 
        schedule, 
        room, 
        duration || 60,
        meeting_id || null,
        meeting_link || null,
        is_live || 0
      ).run();

      const newClass = await env.DB.prepare(
        'SELECT c.*, u.name as teacher_name, 0 as student_count FROM classes c LEFT JOIN users u ON c.teacher_id = u.id WHERE c.id = ?'
      ).bind(classId).first();

      return jsonResponse(newClass, 201);
    }

    if (path === '/teacher/assignments' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'teacher') return jsonResponse({ error: 'Unauthorized' }, 403);

      const assignments = await env.DB.prepare(`
        SELECT a.*, 
               c.title as course_title,
               (SELECT COUNT(*) FROM enrollments WHERE class_id = a.class_id) as total,
               (SELECT COUNT(*) FROM assignment_submissions WHERE assignment_id = a.id) as submitted
        FROM assignments a
        LEFT JOIN classes c ON a.class_id = c.id
        WHERE a.teacher_id = ?
        ORDER BY a.due_date DESC
      `).bind(auth.userId).all();

      return jsonResponse(assignments.results || []);
    }

    if (path === '/teacher/assignments' && request.method === 'POST') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'teacher') return jsonResponse({ error: 'Unauthorized' }, 403);

      const body = await request.json();
      const { title, description, dueDate, points, classId } = body;

      if (!title || !dueDate) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      const assignmentId = generateUUID();

      await env.DB.prepare(`
        INSERT INTO assignments (id, teacher_id, class_id, title, description, due_date, points, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(assignmentId, auth.userId, classId || null, title, description, dueDate, parseInt(points) || 100).run();

      return jsonResponse({ id: assignmentId, message: 'Assignment created successfully' }, 201);
    }

    if (path === '/teacher/analytics' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'teacher') return jsonResponse({ error: 'Unauthorized' }, 403);

      const studentCount = await env.DB.prepare(`
        SELECT COUNT(DISTINCT u.id) as count
        FROM users u
        WHERE u.role = 'student'
      `).first();

      const avgGpa = await env.DB.prepare(`
        SELECT ROUND(AVG(CAST(u.points AS REAL)) / 250.0, 2) as avg
        FROM users u
        WHERE u.role = 'student'
      `).first();

      return jsonResponse({
        studentCount: studentCount?.count || 0,
        avgGpa: avgGpa?.avg?.toFixed(1) || '0.0',
        avgAttendance: 92,
        avgCompletion: 88,
        avgStudyTime: '4.5'
      });
    }

    // ==================== STUDENT ENDPOINTS ====================

    if (path === '/student/classes' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'student') return jsonResponse({ error: 'Unauthorized' }, 403);

      const classes = await env.DB.prepare(`
        SELECT c.*, 
               u.name as teacher_name,
               COUNT(DISTINCT e.student_id) as student_count
        FROM classes c
        JOIN enrollments e ON c.id = e.class_id
        LEFT JOIN users u ON c.teacher_id = u.id
        WHERE e.student_id = ?
        GROUP BY c.id
        ORDER BY c.created_at DESC
      `).bind(auth.userId).all();

      return jsonResponse(classes.results || []);
    }

    if (path === '/assignments' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'student') return jsonResponse({ error: 'Unauthorized' }, 403);

      const assignments = await env.DB.prepare(`
        SELECT a.*, 
               c.title as course_title
        FROM assignments a
        LEFT JOIN classes c ON a.class_id = c.id
        ORDER BY a.due_date ASC
      `).all();

      return jsonResponse(assignments.results || []);
    }

    // ==================== VIDEO CLASS ENDPOINTS ====================

    if (path.match(/^\/classes\/[^/]+\/start$/) && request.method === 'POST') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'teacher') return jsonResponse({ error: 'Unauthorized' }, 403);

      const classId = path.split('/')[2];
      const body = await request.json();
      const { start_time } = body;

      await env.DB.prepare(`
        UPDATE classes 
        SET is_live = 1, last_session_start = ?
        WHERE id = ? AND teacher_id = ?
      `).bind(start_time || new Date().toISOString(), classId, auth.userId).run();

      const sessionId = generateUUID();
      await env.DB.prepare(`
        INSERT INTO class_sessions (id, class_id, started_at, created_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(sessionId, classId, start_time || new Date().toISOString()).run();

      return jsonResponse({
        success: true,
        class_id: classId,
        session_id: sessionId,
        is_live: true,
        started_at: start_time || new Date().toISOString()
      });
    }

    if (path.match(/^\/classes\/[^/]+\/join$/) && request.method === 'POST') {
      const auth = await verifyToken(request);
      if (!auth) return jsonResponse({ error: 'Unauthorized' }, 401);

      const classId = path.split('/')[2];
      const body = await request.json();
      const { user_id, joined_at } = body;

      const session = await env.DB.prepare(`
        SELECT id FROM class_sessions 
        WHERE class_id = ? AND ended_at IS NULL 
        ORDER BY started_at DESC LIMIT 1
      `).bind(classId).first();

      if (session) {
        const participantId = generateUUID();
        await env.DB.prepare(`
          INSERT INTO session_participants (id, session_id, user_id, joined_at)
          VALUES (?, ?, ?, ?)
        `).bind(participantId, session.id, auth.userId, joined_at || new Date().toISOString()).run();
      }

      return jsonResponse({
        success: true,
        participant: {
          id: auth.userId,
          joined_at: joined_at || new Date().toISOString()
        }
      });
    }

    if (path.match(/^\/classes\/[^/]+\/end$/) && request.method === 'POST') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'teacher') return jsonResponse({ error: 'Unauthorized' }, 403);

      const classId = path.split('/')[2];
      const body = await request.json();
      const { end_time } = body;

      const endTime = end_time || new Date().toISOString();

      await env.DB.prepare(`
        UPDATE classes 
        SET is_live = 0
        WHERE id = ? AND teacher_id = ?
      `).bind(classId, auth.userId).run();

      const session = await env.DB.prepare(`
        SELECT id, started_at FROM class_sessions 
        WHERE class_id = ? AND ended_at IS NULL 
        ORDER BY started_at DESC LIMIT 1
      `).bind(classId).first();

      if (session) {
        const duration = Math.floor((new Date(endTime) - new Date(session.started_at)) / 60000);
        
        await env.DB.prepare(`
          UPDATE class_sessions 
          SET ended_at = ?, duration_minutes = ?
          WHERE id = ?
        `).bind(endTime, duration, session.id).run();

        await env.DB.prepare(`
          UPDATE session_participants 
          SET left_at = ?
          WHERE session_id = ? AND left_at IS NULL
        `).bind(endTime, session.id).run();
      }

      return jsonResponse({
        success: true,
        class_id: classId,
        is_live: false,
        ended_at: endTime
      });
    }

    // ==================== RESOURCE ENDPOINTS ====================

    if (path === '/resources' && request.method === 'GET') {
      const subject = url.searchParams.get('subject');
      const type = url.searchParams.get('type');

      let query = 'SELECT r.*, u.name as uploaded_by_name FROM resources r LEFT JOIN users u ON r.uploaded_by = u.id WHERE 1=1';
      const params = [];

      if (subject) {
        query += ' AND r.subject = ?';
        params.push(subject);
      }
      if (type) {
        query += ' AND r.type = ?';
        params.push(type);
      }

      query += ' ORDER BY r.created_at DESC';

      const resources = await env.DB.prepare(query).bind(...params).all();
      return jsonResponse(resources.results || []);
    }

    if (path === '/resources' && request.method === 'POST') {
      const auth = await verifyToken(request);
      if (!auth) return jsonResponse({ error: 'Unauthorized' }, 401);

      const body = await request.json();
      const { title, description, subject, type, fileUrl } = body;

      if (!title || !subject || !type) {
        return jsonResponse({ error: 'Missing required fields' }, 400);
      }

      const resourceId = generateUUID();
      await env.DB.prepare(`
        INSERT INTO resources (id, title, description, subject, type, file_url, uploaded_by, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(resourceId, title, description, subject, type, fileUrl, auth.userId).run();

      return jsonResponse({ id: resourceId, message: 'Resource created successfully' }, 201);
    }

    // ==================== MESSAGE ENDPOINTS ====================

    if (path === '/messages' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth) return jsonResponse({ error: 'Unauthorized' }, 401);

      const messages = await env.DB.prepare(`
        SELECT m.*, 
               s.name as sender_name,
               s.avatar_url as sender_avatar,
               r.name as receiver_name
        FROM messages m
        JOIN users s ON m.sender_id = s.id
        JOIN users r ON m.receiver_id = r.id
        WHERE m.receiver_id = ? OR m.sender_id = ?
        ORDER BY m.created_at DESC
        LIMIT 100
      `).bind(auth.userId, auth.userId).all();

      return jsonResponse(messages.results || []);
    }

    // ==================== NOTIFICATION ENDPOINTS ====================

    if (path === '/notifications' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth) return jsonResponse({ error: 'Unauthorized' }, 401);

      const notifications = await env.DB.prepare(`
        SELECT * FROM notifications 
        WHERE user_id = ? 
        ORDER BY created_at DESC 
        LIMIT 50
      `).bind(auth.userId).all();

      return jsonResponse(notifications.results || []);
    }

    // ==================== ADMIN ENDPOINTS ====================

    if (path === '/admin/stats' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 403);

      const totalUsers = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first();
      const totalStudents = await env.DB.prepare('SELECT COUNT(*) as count FROM users WHERE role = "student"').first();
      const totalTeachers = await env.DB.prepare('SELECT COUNT(*) as count FROM users WHERE role = "teacher"').first();
      const totalClasses = await env.DB.prepare('SELECT COUNT(*) as count FROM classes').first();
      const totalChallenges = await env.DB.prepare('SELECT COUNT(*) as count FROM user_challenges WHERE completed = 1').first();

      return jsonResponse({
        totalUsers: totalUsers?.count || 0,
        totalStudents: totalStudents?.count || 0,
        totalTeachers: totalTeachers?.count || 0,
        totalCourses: totalClasses?.count || 0,
        totalChallenges: totalChallenges?.count || 0
      });
    }

    if (path === '/admin/users' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 403);

      const users = await env.DB.prepare(`
        SELECT 
          id, email, name, role, student_no, teacher_no, course, points, level, streak,
          created_at, updated_at
        FROM users 
        WHERE role != 'admin'
        ORDER BY created_at DESC
      `).all();

      return jsonResponse(users.results || []);
    }

    if (path === '/admin/activities' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 403);

      const activities = [];

      const recentUsers = await env.DB.prepare(`
        SELECT name, created_at, role FROM users 
        WHERE created_at > datetime('now', '-7 days')
        ORDER BY created_at DESC LIMIT 5
      `).all();

      recentUsers.results?.forEach(user => {
        activities.push({
          id: generateUUID(),
          type: 'user',
          message: `New ${user.role} registered: ${user.name}`,
          timestamp: user.created_at,
          time: getTimeAgo(user.created_at)
        });
      });

      const recentClasses = await env.DB.prepare(`
        SELECT title, created_at FROM classes 
        WHERE created_at > datetime('now', '-7 days')
        ORDER BY created_at DESC LIMIT 5
      `).all();

      recentClasses.results?.forEach(classItem => {
        activities.push({
          id: generateUUID(),
          type: 'class',
          message: `New class created: ${classItem.title}`,
          timestamp: classItem.created_at,
          time: getTimeAgo(classItem.created_at)
        });
      });

      activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return jsonResponse(activities.slice(0, 10));
    }

    if (path === '/admin/system-metrics' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 403);

      const dbSize = await env.DB.prepare('SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()').first();
      const userCount = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first();

      return jsonResponse([
        {
          label: 'Database Size',
          value: `${((dbSize?.size || 0) / 1024 / 1024).toFixed(2)} MB`,
          status: 'healthy'
        },
        {
          label: 'Total Users',
          value: userCount?.count || 0,
          status: 'healthy'
        },
        {
          label: 'API Response Time',
          value: '45ms',
          status: 'healthy'
        },
        {
          label: 'Uptime',
          value: '99.9%',
          status: 'healthy'
        }
      ]);
    }

    if (path === '/admin/reports' && request.method === 'GET') {
      const auth = await verifyToken(request);
      if (!auth || auth.role !== 'admin') return jsonResponse({ error: 'Unauthorized' }, 403);

      const reports = [
        {
          id: generateUUID(),
          title: 'Monthly User Activity Report',
          type: 'Activity',
          status: 'ready',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: generateUUID(),
          title: 'Student Performance Analysis',
          type: 'Performance',
          status: 'ready',
          createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: generateUUID(),
          title: 'Course Engagement Report',
          type: 'Engagement',
          status: 'ready',
          createdAt: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      return jsonResponse(reports);
    }

    return jsonResponse({ error: 'Endpoint not found' }, 404);

  } catch (error) {
    console.error('[API ERROR]', error.message, error.stack);
    return jsonResponse({ 
      error: error.message || 'Internal server error',
      details: error.stack 
    }, 500);
  }
}