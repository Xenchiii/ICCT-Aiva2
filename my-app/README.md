# ICCT AIVA

### Artificial Intelligence Virtual Assessment

## Overview

ICCT AIVA is a comprehensive, AI-powered Learning Management System designed to revolutionize education at ICCT. By seamlessly integrating adaptive learning, intelligent assessments, gamification, and collaboration tools into a unified platform, AIVA transforms traditional education into an interactive, personalized learning ecosystem.

### Key Highlights

- **Personalized Learning**: AI-driven learning paths tailored to individual student progress and needs
- **Adaptive Assessments**: Dynamic quizzes that adjust difficulty and provide real-time feedback
- **AI Chatbot Assistance**: 24/7 intelligent support for students and instructors
- **Academic Integrity**: Advanced AI detection system that identifies AI-generated content and maintains originality
- **Gamification**: Engaging badges, points, mini-games, and progress tracking
- **Collaboration Hub**: Interdisciplinary projects, hackathons, and innovation showcases
- **Performance Analytics**: Deep insights into engagement, progress, and skill development
- **All-in-One Platform**: Combines virtual classroom, resource sharing, messaging, and collaboration

---

## Features

### For Students

- **Personalized Dashboard**: Track courses, assignments, and progress at a glance
- **Adaptive Learning Paths**: Receive AI-recommended resources based on your learning style
- **Interactive Assessments**: Take quizzes that adapt to your skill level
- **Gamification**: Earn badges, collect points, and compete on leaderboards
- **Collaboration Tools**: Join group projects, hackathons, and coding challenges
- **AI Assistant**: Get instant help with coursework and study materials
- **Resource Library**: Access course materials, videos, and supplementary content
- **Calendar & Activities**: Stay organized with integrated scheduling

### For Teachers

- **Course Management**: Create and manage courses, assignments, and grading
- **Student Analytics**: Monitor individual and class-wide performance metrics
- **AI-Powered Insights**: Identify struggling students and skill gaps early
- **Content Creation**: Design adaptive assessments with AI assistance
- **Communication Tools**: Message students and send announcements
- **Integrity Monitoring**: Review AI-generated content detection reports
- **Class Collaboration**: Facilitate group projects and peer learning

### For Administrators

- **Enrollment Management**: Oversee student and teacher accounts
- **Platform Analytics**: Track system-wide engagement and performance
- **Course Oversight**: Monitor all courses and assignments
- **Academic Integrity**: Review integrity reports and policy enforcement
- **System Configuration**: Manage roles, permissions, and platform settings

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18.x + TypeScript |
| **Build Tool** | Vite 5.x |
| **Styling** | Plain CSS with component-level styles |
| **Deployment** | Cloudflare Pages |
| **Backend** | Cloudflare Workers (Serverless) |
| **Database** | SQL (Relational Database) |
| **Authentication** | Local Auth + Google OAuth |
| **Code Quality** | ESLint |

---

## Project Structure

```
icct-aiva/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication & OAuth components
│   │   ├── dashboard/         # Role-based dashboards (Admin, Teacher, Student)
│   │   ├── teacher/           # Teacher-specific UI and analytics
│   │   ├── student/           # Student-facing UI (badges, resources, activities)
│   │   ├── modals/            # Reusable modals for content creation
│   │   └── shared/            # Shared components (Navbar, Sidebar, Notifications)
│   ├── services/
│   │   └── api/               # API client and service layer
│   ├── styles/                # Global and component styles
│   ├── utils/                 # Helper functions and utilities
│   ├── App.tsx                # Main application component
│   └── main.tsx               # Application entry point
├── functions/
│   └── api/                   # Cloudflare Workers serverless endpoints
├── public/                    # Static assets
├── schema.sql                 # Database schema definition
├── wrangler.toml              # Cloudflare Workers configuration
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-org/icct-aiva.git
cd icct-aiva
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. **Initialize the database**

```bash
# Run the SQL schema
npm run db:init
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint:fix
```

---

## Deployment

### Cloudflare Pages + Workers

1. **Configure Wrangler**

Update `wrangler.toml` with your Cloudflare account details:

```toml
name = "icct-aiva"
account_id = "your_account_id"
compatibility_date = "2024-01-01"

[env.production]
routes = ["example.com/*"]
```

2. **Deploy**

```bash
npm run deploy
```

Or using Wrangler directly:

```bash
wrangler pages deploy
```

3. **Set up environment variables** in the Cloudflare dashboard under Pages settings

---

## AI Features

### Personalized Learning

The AI engine analyzes student performance, learning patterns, and preferences to generate customized learning paths, recommending courses and resources that match individual needs.

### Adaptive Assessments

Quizzes dynamically adjust difficulty based on student responses, ensuring optimal challenge levels while providing immediate, constructive feedback.

### AI Integrity Checker

Our advanced integrity system detects AI-generated content in student submissions, identifies the specific AI tool used (GPT, Bard, Claude, etc.), and generates detailed reports for instructors while helping students improve originality.

### Performance Analytics

AI-powered analytics track engagement metrics, identify skill gaps, predict learning outcomes, and provide actionable insights for both students and educators.

---

## Contributing

We welcome contributions to ICCT AIVA! Here's how you can help:

### Development Guidelines

1. Follow existing React + TypeScript patterns
2. Keep components modular, reusable, and focused on single responsibilities
3. Write meaningful commit messages
4. Add unit or E2E tests for new features
5. Run linter before committing

### Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linter (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Maintain consistent naming conventions
- Document complex logic with comments
