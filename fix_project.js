import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// 1. Content Generators
const createContextContent = (name) => `
import { createContext, useContext, ReactNode } from 'react';

// Define a minimal type for the context state
interface ${name}ContextType {}

const ${name}Context = createContext<${name}ContextType | null>(null);

export const use${name} = () => {
  const context = useContext(${name}Context);
  // Optional: Add guard if you want strictly non-null
  return context || {}; 
};

export default function ${name}Provider({ children }: { children: ReactNode }) {
  return (
    <${name}Context.Provider value={{}}>
      {children}
    </${name}Context.Provider>
  );
}
`;

const createPageContent = (name) => `
const ${name} = () => {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-3xl font-bold text-primary">${name.replace('Page', '')}</h1>
      <p className="text-gray-500">This module is currently under development.</p>
    </div>
  );
};

export default ${name};
`;

// 2. List of Missing Files
const filesToCreate = [
  // Contexts (7 files)
  { path: 'src/contexts/ThemeContext.tsx', content: createContextContent('Theme') },
  { path: 'src/contexts/AuthContext.tsx', content: createContextContent('Auth') },
  { path: 'src/contexts/AivaContext.tsx', content: createContextContent('Aiva') },
  { path: 'src/contexts/CourseContext.tsx', content: createContextContent('Course') },
  { path: 'src/contexts/GradeContext.tsx', content: createContextContent('Grade') },
  { path: 'src/contexts/InquiryContext.tsx', content: createContextContent('Inquiry') },
  { path: 'src/contexts/NotificationContext.tsx', content: createContextContent('Notification') },

  // Pages (4 files)
  { path: 'src/pages/MembershipPage.tsx', content: createPageContent('MembershipPage') },
  { path: 'src/pages/AboutPage.tsx', content: createPageContent('AboutPage') },
  { path: 'src/pages/ContactPage.tsx', content: createPageContent('ContactPage') },
  { path: 'src/pages/RegisterPage.tsx', content: createPageContent('RegisterPage') },
];

// 3. Execution Loop
console.log("--- 🛠️  ICCT Aiva Auto-Fixer (ESM) ---");
filesToCreate.forEach(file => {
  const fullPath = path.join(__dirname, file.path);
  const dir = path.dirname(fullPath);
  
  ensureDir(dir); // Create src/contexts or src/pages if missing
  
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, file.content.trim());
    console.log(`✅ Created: ${file.path}`);
  } else {
    console.log(`⚠️  Skipped (Exists): ${file.path}`);
  }
});

console.log("--- 🎉 Fix Complete! You can now run 'npm run dev' ---");