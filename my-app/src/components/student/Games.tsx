import { useState } from 'react';
import { Gamepad2, Trophy, Zap, Target, Brain, Calculator, BookOpen, Globe, ArrowLeft, Check, X } from 'lucide-react';

interface Props {
  currentUser: any;
  setCurrentUser: (user: any) => void;
  darkMode: boolean;
}

export default function Games({ currentUser, setCurrentUser, darkMode }: Props) {
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const games = [
    // Accountancy
    { id: 'acc_easy_1', title: 'Balance Sheet Basics', description: 'Learn the fundamentals of balance sheets', icon: Calculator, xpReward: 30, color: 'blue', difficulty: 'Easy', subject: 'Accountancy' },
    { id: 'acc_easy_2', title: 'Journal Entry Practice', description: 'Master basic journal entries', icon: BookOpen, xpReward: 35, color: 'blue', difficulty: 'Easy', subject: 'Accountancy' },
    { id: 'acc_easy_3', title: 'Account Types Quiz', description: 'Identify assets, liabilities, equity', icon: Calculator, xpReward: 40, color: 'blue', difficulty: 'Easy', subject: 'Accountancy' },
    { id: 'acc_med_1', title: 'Trial Balance Challenge', description: 'Prepare and balance trial balance', icon: Calculator, xpReward: 60, color: 'blue', difficulty: 'Medium', subject: 'Accountancy' },
    { id: 'acc_med_2', title: 'Adjusting Entries Master', description: 'Complex adjusting entries scenarios', icon: BookOpen, xpReward: 70, color: 'blue', difficulty: 'Medium', subject: 'Accountancy' },
    { id: 'acc_med_3', title: 'Financial Statement Analysis', description: 'Analyze financial statements', icon: Calculator, xpReward: 80, color: 'blue', difficulty: 'Medium', subject: 'Accountancy' },
    { id: 'acc_hard_1', title: 'Advanced Consolidation', description: 'Master consolidated statements', icon: Calculator, xpReward: 120, color: 'blue', difficulty: 'Hard', subject: 'Accountancy' },
    { id: 'acc_hard_2', title: 'Complex Tax Accounting', description: 'Navigate complex tax scenarios', icon: BookOpen, xpReward: 150, color: 'blue', difficulty: 'Hard', subject: 'Accountancy' },
    { id: 'acc_hard_3', title: 'Forensic Accounting Case', description: 'Solve forensic investigations', icon: Target, xpReward: 200, color: 'blue', difficulty: 'Hard', subject: 'Accountancy' },
    
    // IT
    { id: 'it_easy_1', title: 'Binary Number Basics', description: 'Convert between number systems', icon: Calculator, xpReward: 30, color: 'purple', difficulty: 'Easy', subject: 'IT' },
    { id: 'it_easy_2', title: 'HTML Tag Master', description: 'Learn essential HTML tags', icon: BookOpen, xpReward: 35, color: 'purple', difficulty: 'Easy', subject: 'IT' },
    { id: 'it_easy_3', title: 'Computer Parts Quiz', description: 'Identify hardware components', icon: Brain, xpReward: 40, color: 'purple', difficulty: 'Easy', subject: 'IT' },
    { id: 'it_med_1', title: 'Algorithm Design', description: 'Design and optimize algorithms', icon: Brain, xpReward: 60, color: 'purple', difficulty: 'Medium', subject: 'IT' },
    { id: 'it_med_2', title: 'Database Normalization', description: 'Practice normalization techniques', icon: BookOpen, xpReward: 70, color: 'purple', difficulty: 'Medium', subject: 'IT' },
    { id: 'it_med_3', title: 'Network Configuration', description: 'Configure network setups', icon: Globe, xpReward: 80, color: 'purple', difficulty: 'Medium', subject: 'IT' },
    { id: 'it_hard_1', title: 'Advanced Data Structures', description: 'Complex data structures', icon: Brain, xpReward: 120, color: 'purple', difficulty: 'Hard', subject: 'IT' },
    { id: 'it_hard_2', title: 'Cybersecurity Challenge', description: 'Prevent security vulnerabilities', icon: Target, xpReward: 150, color: 'purple', difficulty: 'Hard', subject: 'IT' },
    { id: 'it_hard_3', title: 'System Architecture Design', description: 'Design scalable architectures', icon: Brain, xpReward: 200, color: 'purple', difficulty: 'Hard', subject: 'IT' },
    
    // Business
    { id: 'bus_easy_1', title: 'Business Terms 101', description: 'Fundamental business concepts', icon: BookOpen, xpReward: 30, color: 'green', difficulty: 'Easy', subject: 'Business' },
    { id: 'bus_easy_2', title: 'Marketing Basics', description: 'Understand the 4 Ps of marketing', icon: Target, xpReward: 35, color: 'green', difficulty: 'Easy', subject: 'Business' },
    { id: 'bus_easy_3', title: 'Supply and Demand', description: 'Master economic principles', icon: Calculator, xpReward: 40, color: 'green', difficulty: 'Easy', subject: 'Business' },
    { id: 'bus_med_1', title: 'SWOT Analysis Practice', description: 'Conduct SWOT analysis', icon: Target, xpReward: 60, color: 'green', difficulty: 'Medium', subject: 'Business' },
    { id: 'bus_med_2', title: 'Financial Forecasting', description: 'Analyze financial projections', icon: Calculator, xpReward: 70, color: 'green', difficulty: 'Medium', subject: 'Business' },
    { id: 'bus_med_3', title: 'Business Strategy Case', description: 'Develop competitive strategies', icon: Brain, xpReward: 80, color: 'green', difficulty: 'Medium', subject: 'Business' },
    { id: 'bus_hard_1', title: 'International Trade', description: 'International business scenarios', icon: Globe, xpReward: 120, color: 'green', difficulty: 'Hard', subject: 'Business' },
    { id: 'bus_hard_2', title: 'M&A Case Study', description: 'Analyze mergers and acquisitions', icon: Target, xpReward: 150, color: 'green', difficulty: 'Hard', subject: 'Business' },
    { id: 'bus_hard_3', title: 'Corporate Restructuring', description: 'Solve organizational challenges', icon: Brain, xpReward: 200, color: 'green', difficulty: 'Hard', subject: 'Business' },
    
    // Criminology
    { id: 'crim_easy_1', title: 'Crime Types Quiz', description: 'Classify different types of crimes', icon: Target, xpReward: 30, color: 'orange', difficulty: 'Easy', subject: 'Criminology' },
    { id: 'crim_easy_2', title: 'Criminal Justice System', description: 'Criminal justice process basics', icon: BookOpen, xpReward: 35, color: 'orange', difficulty: 'Easy', subject: 'Criminology' },
    { id: 'crim_easy_3', title: 'Law Enforcement Basics', description: 'Law enforcement procedures', icon: Target, xpReward: 40, color: 'orange', difficulty: 'Easy', subject: 'Criminology' },
    { id: 'crim_med_1', title: 'Crime Scene Investigation', description: 'Analyze crime scenes', icon: Brain, xpReward: 60, color: 'orange', difficulty: 'Medium', subject: 'Criminology' },
    { id: 'crim_med_2', title: 'Forensic Evidence Analysis', description: 'Interpret forensic evidence', icon: Target, xpReward: 70, color: 'orange', difficulty: 'Medium', subject: 'Criminology' },
    { id: 'crim_med_3', title: 'Criminal Profiling', description: 'Develop criminal profiles', icon: Brain, xpReward: 80, color: 'orange', difficulty: 'Medium', subject: 'Criminology' },
    { id: 'crim_hard_1', title: 'Cold Case Investigation', description: 'Solve cold case scenarios', icon: Brain, xpReward: 120, color: 'orange', difficulty: 'Hard', subject: 'Criminology' },
    { id: 'crim_hard_2', title: 'Legal Procedures Expert', description: 'Complex legal procedures', icon: BookOpen, xpReward: 150, color: 'orange', difficulty: 'Hard', subject: 'Criminology' },
    { id: 'crim_hard_3', title: 'Terrorism & Security', description: 'Counter-terrorism strategies', icon: Target, xpReward: 200, color: 'orange', difficulty: 'Hard', subject: 'Criminology' },
    
    // History
    { id: 'hist_easy_1', title: 'Philippine History 101', description: 'Key events in PH history', icon: BookOpen, xpReward: 30, color: 'blue', difficulty: 'Easy', subject: 'History' },
    { id: 'hist_easy_2', title: 'World War Timeline', description: 'WWII events chronology', icon: Target, xpReward: 35, color: 'blue', difficulty: 'Easy', subject: 'History' },
    { id: 'hist_easy_3', title: 'Historical Figures', description: 'Identify historical personalities', icon: Brain, xpReward: 40, color: 'blue', difficulty: 'Easy', subject: 'History' },
    { id: 'hist_med_1', title: 'Colonial Period Analysis', description: 'Impact of colonialism', icon: BookOpen, xpReward: 60, color: 'blue', difficulty: 'Medium', subject: 'History' },
    { id: 'hist_med_2', title: 'Revolutionary Movements', description: 'Major revolutionary movements', icon: Target, xpReward: 70, color: 'blue', difficulty: 'Medium', subject: 'History' },
    { id: 'hist_med_3', title: 'Primary Source Analysis', description: 'Interpret historical sources', icon: BookOpen, xpReward: 80, color: 'blue', difficulty: 'Medium', subject: 'History' },
    { id: 'hist_hard_1', title: 'Historiography Expert', description: 'Historical interpretations', icon: Brain, xpReward: 120, color: 'blue', difficulty: 'Hard', subject: 'History' },
    { id: 'hist_hard_2', title: 'Comparative Civilizations', description: 'Compare major civilizations', icon: Globe, xpReward: 150, color: 'blue', difficulty: 'Hard', subject: 'History' },
    { id: 'hist_hard_3', title: 'Historical Research Case', description: 'Complex historical research', icon: BookOpen, xpReward: 200, color: 'blue', difficulty: 'Hard', subject: 'History' },
    
    // Biology
    { id: 'bio_easy_1', title: 'Cell Biology Basics', description: 'Structure and function of cells', icon: Brain, xpReward: 30, color: 'green', difficulty: 'Easy', subject: 'Biology' },
    { id: 'bio_easy_2', title: 'Body Systems Quiz', description: 'Major organ systems', icon: Target, xpReward: 35, color: 'green', difficulty: 'Easy', subject: 'Biology' },
    { id: 'bio_easy_3', title: 'Plant vs Animal Cells', description: 'Compare cell types', icon: Brain, xpReward: 40, color: 'green', difficulty: 'Easy', subject: 'Biology' },
    { id: 'bio_med_1', title: 'Genetics and DNA', description: 'Inheritance and genetics', icon: Brain, xpReward: 60, color: 'green', difficulty: 'Medium', subject: 'Biology' },
    { id: 'bio_med_2', title: 'Photosynthesis Process', description: 'Master photosynthesis cycle', icon: Target, xpReward: 70, color: 'green', difficulty: 'Medium', subject: 'Biology' },
    { id: 'bio_med_3', title: 'Evolutionary Biology', description: 'Evolution and natural selection', icon: Brain, xpReward: 80, color: 'green', difficulty: 'Medium', subject: 'Biology' },
    { id: 'bio_hard_1', title: 'Molecular Biology', description: 'Complex molecular processes', icon: Brain, xpReward: 120, color: 'green', difficulty: 'Hard', subject: 'Biology' },
    { id: 'bio_hard_2', title: 'Advanced Genetics', description: 'Complex genetic problems', icon: Target, xpReward: 150, color: 'green', difficulty: 'Hard', subject: 'Biology' },
    { id: 'bio_hard_3', title: 'Biotechnology Applications', description: 'Real biotechnology scenarios', icon: Brain, xpReward: 200, color: 'green', difficulty: 'Hard', subject: 'Biology' },
    
    // Calculus
    { id: 'calc_easy_1', title: 'Limits Fundamentals', description: 'Calculate basic limits', icon: Calculator, xpReward: 30, color: 'purple', difficulty: 'Easy', subject: 'Calculus' },
    { id: 'calc_easy_2', title: 'Derivative Basics', description: 'Find derivatives of functions', icon: Calculator, xpReward: 35, color: 'purple', difficulty: 'Easy', subject: 'Calculus' },
    { id: 'calc_easy_3', title: 'Integration Intro', description: 'Solve basic integration', icon: Calculator, xpReward: 40, color: 'purple', difficulty: 'Easy', subject: 'Calculus' },
    { id: 'calc_med_1', title: 'Chain Rule Master', description: 'Apply chain rule', icon: Calculator, xpReward: 60, color: 'purple', difficulty: 'Medium', subject: 'Calculus' },
    { id: 'calc_med_2', title: 'Optimization Problems', description: 'Solve optimization scenarios', icon: Target, xpReward: 70, color: 'purple', difficulty: 'Medium', subject: 'Calculus' },
    { id: 'calc_med_3', title: 'Integration Techniques', description: 'Master integration methods', icon: Calculator, xpReward: 80, color: 'purple', difficulty: 'Medium', subject: 'Calculus' },
    { id: 'calc_hard_1', title: 'Multivariable Calculus', description: 'Functions of multiple variables', icon: Calculator, xpReward: 120, color: 'purple', difficulty: 'Hard', subject: 'Calculus' },
    { id: 'calc_hard_2', title: 'Differential Equations', description: 'Solve differential equations', icon: Brain, xpReward: 150, color: 'purple', difficulty: 'Hard', subject: 'Calculus' },
    { id: 'calc_hard_3', title: 'Vector Calculus', description: 'Gradient, divergence, curl', icon: Calculator, xpReward: 200, color: 'purple', difficulty: 'Hard', subject: 'Calculus' }
  ];


  const questionBank: any = {
    // ACCOUNTANCY QUESTIONS
    acc_easy_1: [
      { question: 'Assets = Liabilities + ?', options: ['Revenue', 'Equity', 'Expenses', 'Cash'], correct: 1 },
      { question: 'Which is a current asset?', options: ['Building', 'Cash', 'Equipment', 'Patent'], correct: 1 },
      { question: 'Debit increases which account type?', options: ['Liabilities', 'Revenue', 'Assets', 'Equity'], correct: 2 },
      { question: 'What does a balance sheet show?', options: ['Profit', 'Financial position', 'Cash flow', 'Revenue'], correct: 1 },
      { question: 'Credits increase which account?', options: ['Assets', 'Expenses', 'Liabilities', 'Drawings'], correct: 2 }
    ],
    acc_easy_2: [
      { question: 'Which side increases asset accounts?', options: ['Credit', 'Debit', 'Both', 'Neither'], correct: 1 },
      { question: 'What is a journal entry?', options: ['Bank statement', 'Transaction record', 'Financial report', 'Tax form'], correct: 1 },
      { question: 'Cash purchase of supplies affects which accounts?', options: ['Cash & Supplies', 'Cash & Revenue', 'Supplies & Equity', 'Assets only'], correct: 0 },
      { question: 'Double-entry means?', options: ['Two books', 'Debit & Credit', 'Twice a day', 'Two accountants'], correct: 1 },
      { question: 'What increases liability accounts?', options: ['Debit', 'Credit', 'Cash', 'Assets'], correct: 1 }
    ],
    acc_easy_3: [
      { question: 'Which is NOT an asset?', options: ['Cash', 'Equipment', 'Accounts Payable', 'Inventory'], correct: 2 },
      { question: 'Equity represents?', options: ['Debts', 'Owner investment', 'Revenue', 'Expenses'], correct: 1 },
      { question: 'Which is a liability?', options: ['Cash', 'Loans Payable', 'Sales', 'Building'], correct: 1 },
      { question: 'Accounts Receivable is classified as?', options: ['Liability', 'Asset', 'Equity', 'Expense'], correct: 1 },
      { question: 'Revenue increases which account?', options: ['Assets', 'Liabilities', 'Equity', 'Expenses'], correct: 2 }
    ],
    acc_med_1: [
      { question: 'A trial balance checks?', options: ['Profits', 'Debit = Credit', 'Cash flow', 'Tax liability'], correct: 1 },
      { question: 'If debits exceed credits, there is?', options: ['Profit', 'Error', 'Loss', 'Balance'], correct: 1 },
      { question: 'Which appears in trial balance?', options: ['Net income', 'All accounts', 'Cash only', 'Revenue only'], correct: 1 },
      { question: 'Unadjusted trial balance is prepared?', options: ['After adjustments', 'Before adjustments', 'After closing', 'Never'], correct: 1 },
      { question: 'What does trial balance prove?', options: ['Accuracy', 'Mathematical equality', 'Profit', 'Compliance'], correct: 1 }
    ],
    acc_med_2: [
      { question: 'Accrued expenses are?', options: ['Paid but not recorded', 'Recorded but not paid', 'Paid and recorded', 'Neither'], correct: 1 },
      { question: 'Depreciation is?', options: ['Cash expense', 'Non-cash expense', 'Revenue', 'Liability'], correct: 1 },
      { question: 'Prepaid insurance adjusting entry?', options: ['Debit Expense', 'Credit Asset', 'Both A & B', 'Debit Revenue'], correct: 2 },
      { question: 'Unearned revenue adjusting entry?', options: ['Debit Liability', 'Credit Revenue', 'Both A & B', 'Debit Asset'], correct: 2 },
      { question: 'Why make adjusting entries?', options: ['Tax purposes', 'Match revenues/expenses', 'Increase profit', 'Reduce liability'], correct: 1 }
    ],
    acc_med_3: [
      { question: 'Current ratio measures?', options: ['Profitability', 'Liquidity', 'Efficiency', 'Solvency'], correct: 1 },
      { question: 'What is working capital?', options: ['Total assets', 'Current assets - Current liabilities', 'Cash', 'Equity'], correct: 1 },
      { question: 'ROA stands for?', options: ['Return on Assets', 'Rate of Assets', 'Revenue over Assets', 'Risk of Assets'], correct: 0 },
      { question: 'Debt-to-equity ratio shows?', options: ['Profitability', 'Liquidity', 'Leverage', 'Efficiency'], correct: 2 },
      { question: 'Gross profit margin is?', options: ['Net income/Sales', 'Gross profit/Sales', 'Sales/Assets', 'Profit/Equity'], correct: 1 }
    ],
    acc_hard_1: [
      { question: 'In consolidation, eliminate?', options: ['All transactions', 'Intercompany transactions', 'Revenue', 'Assets'], correct: 1 },
      { question: 'Goodwill arises from?', options: ['Excess purchase price', 'Brand value', 'Sales', 'Profit'], correct: 0 },
      { question: 'Non-controlling interest represents?', options: ['Minority ownership', 'Debt', 'Revenue', 'Expense'], correct: 0 },
      { question: 'Consolidated statements show?', options: ['Parent only', 'Subsidiary only', 'Combined entity', 'Neither'], correct: 2 },
      { question: 'Equity method records investment at?', options: ['Cost', 'Fair value', 'Cost + Share of earnings', 'Market value'], correct: 2 }
    ],
    acc_hard_2: [
      { question: 'Deferred tax arises from?', options: ['Timing differences', 'Permanent differences', 'Tax evasion', 'Errors'], correct: 0 },
      { question: 'Temporary difference creates?', options: ['Tax liability/asset', 'Revenue', 'Expense', 'Equity'], correct: 0 },
      { question: 'Effective tax rate is?', options: ['Tax/Income', 'Statutory rate', 'Tax/Revenue', 'Income/Tax'], correct: 0 },
      { question: 'Tax loss carryforward creates?', options: ['Liability', 'Deferred tax asset', 'Revenue', 'Expense'], correct: 1 },
      { question: 'Which creates permanent difference?', options: ['Depreciation', 'Municipal bond interest', 'Bad debts', 'Inventory'], correct: 1 }
    ],
    acc_hard_3: [
      { question: 'Benford\'s Law examines?', options: ['Ratios', 'Digit distribution', 'Trends', 'Balances'], correct: 1 },
      { question: 'Red flag for fraud?', options: ['High revenue', 'Missing documents', 'Profit', 'Growth'], correct: 1 },
      { question: 'Fraud triangle includes?', options: ['Opportunity', 'Pressure', 'Rationalization', 'All of the above'], correct: 3 },
      { question: 'Asset misappropriation is?', options: ['Theft of assets', 'Financial statement fraud', 'Corruption', 'Tax evasion'], correct: 0 },
      { question: 'Forensic accountant\'s role?', options: ['Prepare taxes', 'Investigate fraud', 'Audit', 'Consulting'], correct: 1 }
    ],

    // IT QUESTIONS
    it_easy_1: [
      { question: 'What is binary 1010 in decimal?', options: ['8', '10', '12', '14'], correct: 1 },
      { question: 'How many bits in a byte?', options: ['4', '8', '16', '32'], correct: 1 },
      { question: 'Binary 1111 equals?', options: ['14', '15', '16', '17'], correct: 1 },
      { question: 'What is hex F in decimal?', options: ['10', '12', '15', '16'], correct: 2 },
      { question: 'Binary 0011 + 0101 = ?', options: ['0110', '0111', '1000', '1001'], correct: 2 }
    ],
    it_easy_2: [
      { question: 'HTML stands for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'], correct: 0 },
      { question: 'Which tag creates a paragraph?', options: ['<p>', '<para>', '<pg>', '<text>'], correct: 0 },
      { question: 'Which tag makes text bold?', options: ['<b>', '<bold>', '<strong>', 'Both A & C'], correct: 3 },
      { question: 'HTML documents start with?', options: ['<html>', '<!DOCTYPE>', '<head>', '<body>'], correct: 1 },
      { question: 'Which creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1 }
    ],
    it_easy_3: [
      { question: 'CPU stands for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Computer Processing Unit'], correct: 0 },
      { question: 'RAM is?', options: ['Permanent storage', 'Temporary memory', 'Hard disk', 'Processor'], correct: 1 },
      { question: 'What is the brain of computer?', options: ['RAM', 'Hard disk', 'CPU', 'Monitor'], correct: 2 },
      { question: 'Which is an input device?', options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'], correct: 2 },
      { question: 'GPU handles?', options: ['Graphics', 'General processing', 'Storage', 'Networking'], correct: 0 }
    ],
    it_med_1: [
      { question: 'Big O notation measures?', options: ['Code size', 'Time complexity', 'Memory size', 'Lines of code'], correct: 1 },
      { question: 'O(n²) represents?', options: ['Linear', 'Quadratic', 'Logarithmic', 'Constant'], correct: 1 },
      { question: 'Binary search complexity?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1 },
      { question: 'Best sorting algorithm average case?', options: ['Bubble sort', 'Quick sort', 'Selection sort', 'Insertion sort'], correct: 1 },
      { question: 'Greedy algorithm always finds?', options: ['Global optimum', 'Local optimum', 'No solution', 'Best solution'], correct: 1 }
    ],
    it_med_2: [
      { question: '1NF requires?', options: ['No repeating groups', 'Primary key', 'No partial dependency', 'No transitive dependency'], correct: 0 },
      { question: '2NF eliminates?', options: ['Repeating groups', 'Partial dependency', 'Transitive dependency', 'All redundancy'], correct: 1 },
      { question: '3NF eliminates?', options: ['Repeating groups', 'Partial dependency', 'Transitive dependency', 'All anomalies'], correct: 2 },
      { question: 'Primary key must be?', options: ['Unique', 'Not null', 'Minimal', 'All of the above'], correct: 3 },
      { question: 'Foreign key references?', options: ['Primary key', 'Any field', 'Unique key', 'Composite key'], correct: 0 }
    ],
    it_med_3: [
      { question: 'IP address consists of?', options: ['2 octets', '4 octets', '6 octets', '8 octets'], correct: 1 },
      { question: 'Subnet mask identifies?', options: ['Network portion', 'Host portion', 'Both A & B', 'Neither'], correct: 2 },
      { question: 'Default gateway is?', options: ['Router', 'Switch', 'Hub', 'Server'], correct: 0 },
      { question: 'DHCP assigns?', options: ['Static IP', 'Dynamic IP', 'MAC address', 'Port number'], correct: 1 },
      { question: 'DNS translates?', options: ['IP to MAC', 'Domain to IP', 'IP to Domain', 'MAC to IP'], correct: 1 }
    ],
    it_hard_1: [
      { question: 'AVL tree maintains?', options: ['Balance', 'Order', 'Uniqueness', 'Size'], correct: 0 },
      { question: 'Red-Black tree has max height?', options: ['log n', '2 log n', 'n', 'n²'], correct: 1 },
      { question: 'B-tree is used in?', options: ['Memory', 'Databases', 'Graphics', 'Networking'], correct: 1 },
      { question: 'Trie is efficient for?', options: ['Sorting', 'String operations', 'Math', 'Graphics'], correct: 1 },
      { question: 'Heap property ensures?', options: ['Sorted order', 'Parent-child relationship', 'Balance', 'Uniqueness'], correct: 1 }
    ],
    it_hard_2: [
      { question: 'SQL injection targets?', options: ['Database', 'Network', 'Memory', 'CPU'], correct: 0 },
      { question: 'XSS stands for?', options: ['Cross-Site Scripting', 'Extra Security System', 'Extended Site Security', 'XML Security Standard'], correct: 0 },
      { question: 'HTTPS uses port?', options: ['80', '443', '8080', '21'], correct: 1 },
      { question: 'Firewall operates at?', options: ['Application layer', 'Network layer', 'Physical layer', 'All layers'], correct: 3 },
      { question: 'Encryption ensures?', options: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'], correct: 0 }
    ],
    it_hard_3: [
      { question: 'Microservices architecture uses?', options: ['Monolith', 'Distributed services', 'Single server', 'One database'], correct: 1 },
      { question: 'Load balancer distributes?', options: ['Data', 'Traffic', 'Storage', 'Memory'], correct: 1 },
      { question: 'CAP theorem includes?', options: ['Consistency', 'Availability', 'Partition tolerance', 'All of the above'], correct: 3 },
      { question: 'Horizontal scaling adds?', options: ['More power', 'More servers', 'More memory', 'More storage'], correct: 1 },
      { question: 'CDN improves?', options: ['Security', 'Performance', 'Storage', 'Processing'], correct: 1 }
    ],

    // BUSINESS QUESTIONS
    bus_easy_1: [
      { question: 'The 4 Ps include Product, Price, Place, and?', options: ['Profit', 'Promotion', 'Production', 'People'], correct: 1 },
      { question: 'What is B2B?', options: ['Business to Business', 'Back to Basics', 'Best to Buy', 'Brand to Brand'], correct: 0 },
      { question: 'ROI stands for?', options: ['Rate of Income', 'Return on Investment', 'Risk of Interest', 'Revenue or Income'], correct: 1 },
      { question: 'What is a market niche?', options: ['Large market', 'Specialized segment', 'Market leader', 'New market'], correct: 1 },
      { question: 'GDP measures?', options: ['Personal income', 'Economic output', 'Stock prices', 'Tax revenue'], correct: 1 }
    ],
    bus_easy_2: [
      { question: 'Target market is?', options: ['All customers', 'Specific customer group', 'Competitors', 'Suppliers'], correct: 1 },
      { question: 'Brand awareness means?', options: ['Product quality', 'Customer recognition', 'Price point', 'Distribution'], correct: 1 },
      { question: 'What is market segmentation?', options: ['Dividing market', 'Combining markets', 'Pricing strategy', 'Sales technique'], correct: 0 },
      { question: 'USP stands for?', options: ['Unique Selling Proposition', 'Universal Sales Process', 'United Service Plan', 'Uniform Sale Price'], correct: 0 },
      { question: 'Break-even point is when?', options: ['Profit = Loss', 'Revenue = Costs', 'Sales peak', 'Loss occurs'], correct: 1 }
    ],
    bus_easy_3: [
      { question: 'When price increases, demand usually?', options: ['Increases', 'Decreases', 'Stays same', 'Doubles'], correct: 1 },
      { question: 'Equilibrium occurs when?', options: ['Supply = Demand', 'Price = 0', 'Profit maximum', 'Cost minimum'], correct: 0 },
      { question: 'Elastic demand means?', options: ['Price-sensitive', 'Price-insensitive', 'No demand', 'High demand'], correct: 0 },
      { question: 'Scarcity causes prices to?', options: ['Fall', 'Rise', 'Stay same', 'Disappear'], correct: 1 },
      { question: 'Substitute goods are?', options: ['Complementary', 'Alternative choices', 'Luxury items', 'Necessities'], correct: 1 }
    ],
    bus_med_1: [
      { question: 'SWOT stands for?', options: ['Strengths, Weaknesses, Opportunities, Threats', 'Sales, Work, Operations, Trading', 'Systems, Workers, Output, Technology', 'Strategy, Wealth, Organization, Targets'], correct: 0 },
      { question: 'Strengths are?', options: ['External factors', 'Internal advantages', 'Market threats', 'Customer needs'], correct: 1 },
      { question: 'Opportunities are?', options: ['Internal', 'External favorable', 'Weaknesses', 'Threats'], correct: 1 },
      { question: 'SWOT helps with?', options: ['Hiring', 'Strategic planning', 'Accounting', 'Manufacturing'], correct: 1 },
      { question: 'Threats in SWOT are?', options: ['Internal', 'External risks', 'Strengths', 'Opportunities'], correct: 1 }
    ],
    bus_med_2: [
      { question: 'Cash flow forecast predicts?', options: ['Profit', 'Cash movements', 'Sales', 'Expenses'], correct: 1 },
      { question: 'Positive cash flow means?', options: ['Inflows > Outflows', 'Profit', 'Revenue', 'Growth'], correct: 0 },
      { question: 'Budget variance is?', options: ['Actual - Budget', 'Budget - Actual', 'Profit', 'Loss'], correct: 0 },
      { question: 'Financial ratio analysis compares?', options: ['Companies', 'Periods', 'Performance metrics', 'All of the above'], correct: 3 },
      { question: 'Working capital = ?', options: ['Assets - Liabilities', 'Current Assets - Current Liabilities', 'Revenue - Costs', 'Profit - Tax'], correct: 1 }
    ],
    bus_med_3: [
      { question: 'Porter\'s Five Forces analyzes?', options: ['Internal factors', 'Industry competition', 'Employee performance', 'Financial health'], correct: 1 },
      { question: 'Cost leadership strategy focuses on?', options: ['Lowest prices', 'Quality', 'Innovation', 'Service'], correct: 0 },
      { question: 'Differentiation strategy creates?', options: ['Unique value', 'Low cost', 'Mass market', 'Volume'], correct: 0 },
      { question: 'Competitive advantage means?', options: ['Market leader', 'Superiority over rivals', 'High profit', 'Large size'], correct: 1 },
      { question: 'Blue ocean strategy seeks?', options: ['Compete directly', 'Uncontested markets', 'Price wars', 'Market share'], correct: 1 }
    ],
    bus_hard_1: [
      { question: 'Trade barriers include?', options: ['Tariffs', 'Quotas', 'Embargoes', 'All of the above'], correct: 3 },
      { question: 'Exchange rate affects?', options: ['Import/export costs', 'Domestic sales', 'Employee wages', 'Office rent'], correct: 0 },
      { question: 'FDI stands for?', options: ['Foreign Direct Investment', 'Federal Debt Index', 'Financial Development Institute', 'Free Distribution Initiative'], correct: 0 },
      { question: 'Globalization increases?', options: ['Isolation', 'Interconnection', 'Local focus', 'Barriers'], correct: 1 },
      { question: 'Cultural intelligence matters in?', options: ['Domestic business', 'International business', 'Accounting', 'Manufacturing'], correct: 1 }
    ],
    bus_hard_2: [
      { question: 'Synergy in M&A means?', options: ['1+1=2', '1+1>2', '1+1<2', 'No change'], correct: 1 },
      { question: 'Due diligence examines?', options: ['Surface info', 'Comprehensive analysis', 'Price only', 'Nothing'], correct: 1 },
      { question: 'Hostile takeover occurs when?', options: ['Board agrees', 'Against management wishes', 'Merger', 'Bankruptcy'], correct: 1 },
      { question: 'Acquisition premium is?', options: ['Discount', 'Above market price', 'Market price', 'Below market'], correct: 1 },
      { question: 'Post-merger integration focuses on?', options: ['Separation', 'Combining operations', 'Competition', 'Dissolution'], correct: 1 }
    ],
    bus_hard_3: [
      { question: 'Downsizing reduces?', options: ['Profit', 'Workforce/operations', 'Revenue', 'Market share'], correct: 1 },
      { question: 'Divestiture means?', options: ['Acquiring', 'Selling off assets', 'Expanding', 'Hiring'], correct: 1 },
      { question: 'Change management addresses?', options: ['Resistance', 'Implementation', 'Communication', 'All of the above'], correct: 3 },
      { question: 'Organizational culture is?', options: ['Easy to change', 'Shared values/beliefs', 'Irrelevant', 'Written rules'], correct: 1 },
      { question: 'Turnaround strategy aims to?', options: ['Maintain status', 'Reverse decline', 'Expand rapidly', 'Exit market'], correct: 1 }
    ],

    // CRIMINOLOGY QUESTIONS
    crim_easy_1: [
      { question: 'What is a felony?', options: ['Minor crime', 'Serious crime', 'Traffic violation', 'Civil case'], correct: 1 },
      { question: 'Miranda rights protect the right to?', options: ['Bear arms', 'Remain silent', 'Vote', 'Travel'], correct: 1 },
      { question: 'What does CSI stand for?', options: ['Crime Scene Investigation', 'Criminal Security Institute', 'Central State Inspector', 'Court System Index'], correct: 0 },
      { question: 'Probable cause is needed for?', options: ['Arrest', 'Trial', 'Sentencing', 'Appeal'], correct: 0 },
      { question: 'What is white-collar crime?', options: ['Violent crime', 'Financial crime', 'Drug crime', 'Organized crime'], correct: 1 }
    ],
    crim_easy_2: [
      { question: 'Law enforcement includes?', options: ['Police', 'Courts', 'Corrections', 'All of the above'], correct: 3 },
      { question: 'Criminal justice system has how many components?', options: ['One', 'Two', 'Three', 'Four'], correct: 2 },
      { question: 'Beyond reasonable doubt applies in?', options: ['Civil cases', 'Criminal cases', 'Both', 'Neither'], correct: 1 },
      { question: 'Due process protects?', options: ['Government', 'Individual rights', 'Criminals', 'Judges'], correct: 1 },
      { question: 'A warrant requires?', options: ['Judge approval', 'Police decision', 'Public vote', 'Lawyer request'], correct: 0 }
    ],
    crim_easy_3: [
      { question: 'Police primary duty is?', options: ['Punish', 'Enforce laws', 'Make laws', 'Judge'], correct: 1 },
      { question: 'Chain of custody ensures?', options: ['Evidence integrity', 'Fast trials', 'Convictions', 'Arrests'], correct: 0 },
      { question: 'Search warrant allows?', options: ['Arrest', 'Search property', 'Question', 'Detain'], correct: 1 },
      { question: 'Bail purpose is?', options: ['Punishment', 'Ensure court appearance', 'Fine', 'Sentence'], correct: 1 },
      { question: 'Police report documents?', options: ['Evidence', 'Incident details', 'Statements', 'All of the above'], correct: 3 }
    ],
    crim_med_1: [
      { question: 'Locard\'s principle states?', options: ['No crime unpunished', 'Every contact leaves trace', 'Innocent until proven', 'Evidence rules'], correct: 1 },
      { question: 'Fingerprints are?', options: ['Common', 'Unique', 'Changeable', 'Unreliable'], correct: 1 },
      { question: 'Blood spatter analysis determines?', options: ['DNA', 'Impact angle/direction', 'Age', 'Type only'], correct: 1 },
      { question: 'What contaminates crime scene?', options: ['Documentation', 'Unauthorized access', 'Photography', 'Measurement'], correct: 1 },
      { question: 'First responder should?', options: ['Investigate', 'Secure scene', 'Interview', 'Collect evidence'], correct: 1 }
    ],
    crim_med_2: [
      { question: 'DNA evidence identifies?', options: ['Weapon', 'Individual', 'Crime type', 'Time'], correct: 1 },
      { question: 'Ballistics examines?', options: ['Blood', 'Firearms/bullets', 'Fingerprints', 'Documents'], correct: 1 },
      { question: 'Toxicology detects?', options: ['Poisons/drugs', 'Blood type', 'DNA', 'Fingerprints'], correct: 0 },
      { question: 'Autopsy determines?', options: ['Identity', 'Cause of death', 'Motive', 'Suspect'], correct: 1 },
      { question: 'Trace evidence includes?', options: ['Hair/fibers', 'Weapons', 'Bodies', 'Witnesses'], correct: 0 }
    ],
    crim_med_3: [
      { question: 'Criminal profiling is?', options: ['Exact science', 'Investigative tool', 'Proof', 'Guarantee'], correct: 1 },
      { question: 'MO stands for?', options: ['Modus Operandi', 'Murder Operation', 'Main Objective', 'Moral Order'], correct: 0 },
      { question: 'Signature behavior is?', options: ['Necessary for crime', 'Psychological need', 'Random', 'Evidence'], correct: 1 },
      { question: 'Organized offender shows?', options: ['Planning', 'Impulsiveness', 'Chaos', 'Randomness'], correct: 0 },
      { question: 'Victimology studies?', options: ['Criminals', 'Victims', 'Witnesses', 'Police'], correct: 1 }
    ],
    crim_hard_1: [
      { question: 'Cold case review examines?', options: ['New cases', 'Unsolved old cases', 'Closed cases', 'Active cases'], correct: 1 },
      { question: 'New technology helps cold cases through?', options: ['DNA databases', 'Better methods', 'Digital records', 'All of the above'], correct: 3 },
      { question: 'Witness memory over time?', options: ['Improves', 'Deteriorates', 'Stays same', 'Becomes perfect'], correct: 1 },
      { question: 'Fresh eyes on cold case mean?', options: ['New investigators', 'Witnesses', 'Evidence', 'Technology'], correct: 0 },
      { question: 'Cold case priority is?', options: ['High', 'Medium', 'Low', 'None'], correct: 2 }
    ],
    crim_hard_2: [
      { question: 'Admissible evidence must be?', options: ['Relevant', 'Reliable', 'Legally obtained', 'All of the above'], correct: 3 },
      { question: 'Hearsay is generally?', options: ['Admissible', 'Inadmissible', 'Preferred', 'Required'], correct: 1 },
      { question: 'Chain of custody proves?', options: ['Guilt', 'Evidence integrity', 'Motive', 'Opportunity'], correct: 1 },
      { question: 'Expert witness provides?', options: ['Opinion evidence', 'Character reference', 'Alibi', 'Motive'], correct: 0 },
      { question: 'Burden of proof in criminal case?', options: ['Defense', 'Prosecution', 'Judge', 'Jury'], correct: 1 }
    ],
    crim_hard_3: [
      { question: 'Terrorism motivation is often?', options: ['Financial', 'Political/ideological', 'Personal', 'Random'], correct: 1 },
      { question: 'Counter-terrorism focuses on?', options: ['Reaction', 'Prevention', 'Punishment', 'Investigation'], correct: 1 },
      { question: 'Intelligence gathering involves?', options: ['Public info', 'Surveillance', 'Analysis', 'All of the above'], correct: 3 },
      { question: 'Threat assessment evaluates?', options: ['Past crimes', 'Potential risks', 'Evidence', 'Witnesses'], correct: 1 },
      { question: 'Security layers provide?', options: ['Single defense', 'Multiple defenses', 'No defense', 'Guaranteed safety'], correct: 1 }
    ],

    // HISTORY QUESTIONS
    hist_easy_1: [
      { question: 'Who is the father of Philippine nationalism?', options: ['Rizal', 'Bonifacio', 'Aguinaldo', 'Del Pilar'], correct: 0 },
      { question: 'When did PH gain independence?', options: ['1898', '1935', '1946', '1965'], correct: 2 },
      { question: 'Who was the first PH president?', options: ['Quezon', 'Aguinaldo', 'Osmeña', 'Roxas'], correct: 1 },
      { question: 'What year was EDSA Revolution?', options: ['1981', '1986', '1991', '1996'], correct: 1 },
      { question: 'Who colonized PH for 333 years?', options: ['USA', 'Japan', 'Spain', 'Portugal'], correct: 2 }
    ],
    hist_easy_2: [
      { question: 'WWII started in?', options: ['1935', '1939', '1941', '1945'], correct: 1 },
      { question: 'WWII ended in?', options: ['1943', '1944', '1945', '1946'], correct: 2 },
      { question: 'Pearl Harbor was attacked in?', options: ['1939', '1940', '1941', '1942'], correct: 2 },
      { question: 'D-Day occurred in?', options: ['1942', '1943', '1944', '1945'], correct: 2 },
      { question: 'Atomic bombs dropped on?', options: ['Germany', 'Italy', 'Japan', 'Korea'], correct: 2 }
    ],
    hist_easy_3: [
      { question: 'Who discovered America?', options: ['Magellan', 'Columbus', 'Vespucci', 'Cortez'], correct: 1 },
      { question: 'Napoleon was from?', options: ['England', 'France', 'Spain', 'Italy'], correct: 1 },
      { question: 'Who painted Mona Lisa?', options: ['Michelangelo', 'Da Vinci', 'Raphael', 'Donatello'], correct: 1 },
      { question: 'Martin Luther King Jr. fought for?', options: ['Independence', 'Civil rights', 'Women rights', 'Labor rights'], correct: 1 },
      { question: 'Great Wall is in?', options: ['Japan', 'Korea', 'China', 'Mongolia'], correct: 2 }
    ],
    hist_med_1: [
      { question: 'Spanish colonization of PH lasted?', options: ['300 years', '333 years', '400 years', '500 years'], correct: 1 },
      { question: 'Impact of colonialism includes?', options: ['Cultural change', 'Religious conversion', 'Economic exploitation', 'All of the above'], correct: 3 },
      { question: 'Encomienda system was?', options: ['Land grant system', 'Tax system', 'Trade system', 'Education system'], correct: 0 },
      { question: 'Galleon trade connected?', options: ['Spain-Philippines', 'Manila-Acapulco', 'China-Philippines', 'Japan-Philippines'], correct: 1 },
      { question: 'Colonial mentality refers to?', options: ['Military rule', 'Cultural preference for colonizer', 'Trade policy', 'Language'], correct: 1 }
    ],
    hist_med_2: [
      { question: 'French Revolution began in?', options: ['1776', '1789', '1799', '1804'], correct: 1 },
      { question: 'Bolshevik Revolution occurred in?', options: ['1905', '1917', '1921', '1939'], correct: 1 },
      { question: 'Cuban Revolution led by?', options: ['Che Guevara', 'Fidel Castro', 'Both A & B', 'Neither'], correct: 2 },
      { question: 'Revolutionary movements sought?', options: ['Maintain status', 'Radical change', 'Minor reforms', 'Peaceful transition'], correct: 1 },
      { question: 'American Revolution was against?', options: ['France', 'Spain', 'Britain', 'Germany'], correct: 2 }
    ],
    hist_med_3: [
      { question: 'Primary sources are?', options: ['Textbooks', 'Original documents', 'Historian accounts', 'Movies'], correct: 1 },
      { question: 'Secondary sources are?', options: ['Original letters', 'Historian analysis', 'Artifacts', 'Diaries'], correct: 1 },
      { question: 'Historical bias means?', options: ['Accuracy', 'Prejudiced perspective', 'Objectivity', 'Truth'], correct: 1 },
      { question: 'Context is important for?', options: ['Understanding events', 'Memorizing dates', 'Passing tests', 'Writing names'], correct: 0 },
      { question: 'Corroboration means?', options: ['One source', 'Multiple sources confirm', 'Contradiction', 'Guessing'], correct: 1 }
    ],
    hist_hard_1: [
      { question: 'Historiography is study of?', options: ['History', 'How history is written', 'Dates', 'Wars'], correct: 1 },
      { question: 'Historical interpretation varies due to?', options: ['Facts', 'Perspective/context', 'Dates', 'Names'], correct: 1 },
      { question: 'Revisionist history?', options: ['Rewrites facts', 'Reinterprets events', 'Ignores evidence', 'Invents history'], correct: 1 },
      { question: 'Historical methodology includes?', options: ['Random guessing', 'Systematic investigation', 'Personal opinion', 'Fiction writing'], correct: 1 },
      { question: 'Objectivity in history is?', options: ['Easy', 'Impossible', 'Goal to strive for', 'Unnecessary'], correct: 2 }
    ],
    hist_hard_2: [
      { question: 'Ancient civilizations include?', options: ['Egypt', 'Mesopotamia', 'Indus Valley', 'All of the above'], correct: 3 },
      { question: 'Roman Empire fell in?', options: ['300 AD', '476 AD', '500 AD', '600 AD'], correct: 1 },
      { question: 'Renaissance means?', options: ['Dark ages', 'Rebirth', 'War', 'Peace'], correct: 1 },
      { question: 'Silk Road facilitated?', options: ['War', 'Trade/cultural exchange', 'Isolation', 'Colonization'], correct: 1 },
      { question: 'Islamic Golden Age contributed?', options: ['Nothing', 'Science/math/philosophy', 'War', 'Isolation'], correct: 1 }
    ],
    hist_hard_3: [
      { question: 'Historical research requires?', options: ['Imagination only', 'Rigorous methodology', 'Bias', 'Guessing'], correct: 1 },
      { question: 'Archival research involves?', options: ['Internet only', 'Primary documents', 'Textbooks', 'Movies'], correct: 1 },
      { question: 'Oral history captures?', options: ['Written records', 'Personal testimonies', 'Archaeological finds', 'Art'], correct: 1 },
      { question: 'Historical analysis requires?', options: ['Memorization', 'Critical thinking', 'Acceptance', 'Belief'], correct: 1 },
      { question: 'Thesis statement in history paper?', options: ['Question', 'Argument', 'Summary', 'Quote'], correct: 1 }
    ],

    // BIOLOGY QUESTIONS
    bio_easy_1: [
      { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'], correct: 1 },
      { question: 'What does DNA stand for?', options: ['Deoxyribonucleic Acid', 'Dual Nuclear Acid', 'Dynamic Nuclei Acid', 'Derivative Nuclear Acid'], correct: 0 },
      { question: 'Which organelle controls the cell?', options: ['Mitochondria', 'Nucleus', 'Vacuole', 'Cell wall'], correct: 1 },
      { question: 'What do ribosomes produce?', options: ['DNA', 'Proteins', 'Lipids', 'Carbohydrates'], correct: 1 },
      { question: 'What surrounds plant cells?', options: ['Membrane only', 'Cell wall', 'Capsule', 'Nothing'], correct: 1 }
    ],
    bio_easy_2: [
      { question: 'Circulatory system pumps?', options: ['Air', 'Blood', 'Food', 'Waste'], correct: 1 },
      { question: 'Lungs are part of which system?', options: ['Digestive', 'Respiratory', 'Nervous', 'Skeletal'], correct: 1 },
      { question: 'Stomach is part of which system?', options: ['Respiratory', 'Digestive', 'Nervous', 'Circulatory'], correct: 1 },
      { question: 'Brain controls?', options: ['Blood', 'Body functions', 'Only muscles', 'Only breathing'], correct: 1 },
      { question: 'Skeleton provides?', options: ['Blood', 'Support/protection', 'Digestion', 'Breathing'], correct: 1 }
    ],
    bio_easy_3: [
      { question: 'Plant cells have?', options: ['No nucleus', 'Chloroplasts', 'No membrane', 'Cilia'], correct: 1 },
      { question: 'Animal cells lack?', options: ['Nucleus', 'Mitochondria', 'Cell wall', 'Ribosomes'], correct: 2 },
      { question: 'Chloroplasts perform?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Movement'], correct: 1 },
      { question: 'Both cell types have?', options: ['Cell wall', 'Chloroplasts', 'Nucleus', 'Large vacuole'], correct: 2 },
      { question: 'Plant cells are typically?', options: ['Round', 'Rectangular', 'Irregular', 'Star-shaped'], correct: 1 }
    ],
    bio_med_1: [
      { question: 'DNA contains genetic?', options: ['Energy', 'Information', 'Water', 'Minerals'], correct: 1 },
      { question: 'Genes are made of?', options: ['Proteins', 'DNA', 'RNA', 'Lipids'], correct: 1 },
      { question: 'Dominant allele is represented by?', options: ['Lowercase', 'Uppercase', 'Number', 'Symbol'], correct: 1 },
      { question: 'Genotype refers to?', options: ['Physical traits', 'Genetic makeup', 'Behavior', 'Environment'], correct: 1 },
      { question: 'Mendel studied?', options: ['Humans', 'Pea plants', 'Bacteria', 'Viruses'], correct: 1 }
    ],
    bio_med_2: [
      { question: 'Photosynthesis produces?', options: ['CO2', 'Glucose & O2', 'Water', 'Nitrogen'], correct: 1 },
      { question: 'Photosynthesis requires?', options: ['Darkness', 'Light', 'Cold', 'No water'], correct: 1 },
      { question: 'Chlorophyll is?', options: ['Red', 'Green', 'Blue', 'Yellow'], correct: 1 },
      { question: 'Photosynthesis equation: CO2 + H2O + light → ?', options: ['O2 only', 'Glucose only', 'Glucose & O2', 'CO2'], correct: 2 },
      { question: 'Stomata allow?', options: ['Roots', 'Gas exchange', 'Reproduction', 'Movement'], correct: 1 }
    ],
    bio_med_3: [
      { question: 'Evolution is change in?', options: ['Individual', 'Population over time', 'Environment', 'Climate'], correct: 1 },
      { question: 'Natural selection favors?', options: ['Weakest', 'Best adapted', 'Largest', 'Oldest'], correct: 1 },
      { question: 'Darwin studied finches in?', options: ['Hawaii', 'Galapagos', 'Madagascar', 'Australia'], correct: 1 },
      { question: 'Adaptation helps organism?', options: ['Die', 'Survive', 'Shrink', 'Disappear'], correct: 1 },
      { question: 'Vestigial structures are?', options: ['New', 'Reduced/functionless', 'Essential', 'Growing'], correct: 1 }
    ],
    bio_hard_1: [
      { question: 'DNA replication is?', options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Random'], correct: 1 },
      { question: 'RNA polymerase creates?', options: ['DNA', 'mRNA', 'Proteins', 'Lipids'], correct: 1 },
      { question: 'Translation occurs in?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi'], correct: 1 },
      { question: 'Codon consists of?', options: ['1 nucleotide', '2 nucleotides', '3 nucleotides', '4 nucleotides'], correct: 2 },
      { question: 'Central dogma: DNA → ? → Protein', options: ['Lipid', 'RNA', 'Carbohydrate', 'Mineral'], correct: 1 }
    ],
    bio_hard_2: [
      { question: 'Punnett square predicts?', options: ['Environment', 'Offspring genotypes', 'Weather', 'Behavior'], correct: 1 },
      { question: 'Heterozygous means?', options: ['Same alleles', 'Different alleles', 'No alleles', 'Many alleles'], correct: 1 },
      { question: 'Sex-linked traits are on?', options: ['Autosomes', 'X or Y chromosome', 'All chromosomes', 'No chromosomes'], correct: 1 },
      { question: 'Incomplete dominance results in?', options: ['Dominant trait', 'Recessive trait', 'Blend', 'No trait'], correct: 2 },
      { question: 'Mutation is?', options: ['Always harmful', 'Change in DNA', 'Always beneficial', 'Impossible'], correct: 1 }
    ],
    bio_hard_3: [
      { question: 'PCR amplifies?', options: ['Proteins', 'DNA', 'Cells', 'Organisms'], correct: 1 },
      { question: 'CRISPR is used for?', options: ['Cooking', 'Gene editing', 'Exercise', 'Communication'], correct: 1 },
      { question: 'Recombinant DNA combines?', options: ['Same DNA', 'Different DNA sources', 'RNA', 'Proteins'], correct: 1 },
      { question: 'GMO stands for?', options: ['General Medical Operation', 'Genetically Modified Organism', 'Global Market Output', 'Genetic Material Only'], correct: 1 },
      { question: 'Biotechnology applications include?', options: ['Medicine', 'Agriculture', 'Industry', 'All of the above'], correct: 3 }
    ],

    // CALCULUS QUESTIONS
    calc_easy_1: [
      { question: 'What is the limit of 1/x as x approaches infinity?', options: ['0', '1', 'Infinity', 'Undefined'], correct: 0 },
      { question: 'A function is continuous if?', options: ['It has no breaks', 'It has limits', 'It is differentiable', 'It is defined'], correct: 0 },
      { question: 'lim(x→2) of 3x + 1 = ?', options: ['5', '6', '7', '8'], correct: 2 },
      { question: 'What does a limit describe?', options: ['Maximum value', 'Behavior near a point', 'Derivative', 'Integral'], correct: 1 },
      { question: 'lim(x→0) of x² = ?', options: ['-1', '0', '1', 'Undefined'], correct: 1 }
    ],
    calc_easy_2: [
      { question: 'Derivative of x² is?', options: ['x', '2x', 'x²', '2'], correct: 1 },
      { question: 'Derivative represents?', options: ['Area', 'Rate of change', 'Volume', 'Distance'], correct: 1 },
      { question: 'Derivative of a constant is?', options: ['1', '0', 'x', 'Constant'], correct: 1 },
      { question: 'd/dx of 5x = ?', options: ['5', 'x', '5x', '0'], correct: 0 },
      { question: 'Power rule: d/dx of xⁿ = ?', options: ['xⁿ', 'nxⁿ', 'nxⁿ⁻¹', 'xⁿ⁻¹'], correct: 2 }
    ],
    calc_easy_3: [
      { question: 'Integration is reverse of?', options: ['Addition', 'Differentiation', 'Multiplication', 'Division'], correct: 1 },
      { question: '∫ 2x dx = ?', options: ['2x', 'x²', 'x² + C', '2'], correct: 2 },
      { question: 'Constant of integration is denoted by?', options: ['A', 'B', 'C', 'K'], correct: 2 },
      { question: '∫ 1 dx = ?', options: ['0', '1', 'x', 'x + C'], correct: 3 },
      { question: 'Integral represents?', options: ['Slope', 'Area under curve', 'Point', 'Line'], correct: 1 }
    ],
    calc_med_1: [
      { question: 'Chain rule: d/dx of f(g(x)) = ?', options: ['f\'(x)g\'(x)', 'f\'(g(x))·g\'(x)', 'f(x)·g(x)', 'f\'(x)+g\'(x)'], correct: 1 },
      { question: 'Product rule: d/dx of f·g = ?', options: ['f\'·g\'', 'f·g\'+ f\'·g', 'f\'·g', 'f·g\''], correct: 1 },
      { question: 'Quotient rule involves?', options: ['f/g', '(f\'g - fg\')/g²', 'f\'/g\'', 'fg'], correct: 1 },
      { question: 'd/dx of sin(x) = ?', options: ['-cos(x)', 'cos(x)', '-sin(x)', 'tan(x)'], correct: 1 },
      { question: 'd/dx of eˣ = ?', options: ['xeˣ⁻¹', 'eˣ', 'eˣ⁻¹', '1'], correct: 1 }
    ],
    calc_med_2: [
      { question: 'Critical points occur where?', options: ['f\'(x) = 0 or undefined', 'f(x) = 0', 'f(x) = max', 'f(x) = min'], correct: 0 },
      { question: 'Second derivative test determines?', options: ['Slope', 'Concavity', 'Area', 'Volume'], correct: 1 },
      { question: 'Maximum occurs when f\' = 0 and f\'\' is?', options: ['Positive', 'Negative', 'Zero', 'Undefined'], correct: 1 },
      { question: 'Optimization finds?', options: ['Average', 'Maximum or minimum', 'Median', 'Mode'], correct: 1 },
      { question: 'Inflection point has?', options: ['f\' = 0', 'f\'\' = 0', 'f = 0', 'f\'\'\' = 0'], correct: 1 }
    ],
    calc_med_3: [
      { question: 'U-substitution simplifies?', options: ['Derivatives', 'Integrals', 'Limits', 'Functions'], correct: 1 },
      { question: 'Integration by parts uses?', options: ['Chain rule', 'Product rule', 'Quotient rule', 'Power rule'], correct: 1 },
      { question: '∫ sin(x) dx = ?', options: ['cos(x) + C', '-cos(x) + C', 'sin(x) + C', '-sin(x) + C'], correct: 1 },
      { question: '∫ eˣ dx = ?', options: ['eˣ + C', 'xeˣ + C', 'eˣ⁻¹ + C', 'ln(x) + C'], correct: 0 },
      { question: 'Definite integral gives?', options: ['Function', 'Number', 'Derivative', 'Limit'], correct: 1 }
    ],
    calc_hard_1: [
      { question: 'Partial derivative treats other variables as?', options: ['Variables', 'Constants', 'Zero', 'Infinite'], correct: 1 },
      { question: 'Gradient points in direction of?', options: ['Decrease', 'Maximum increase', 'Zero', 'Minimum'], correct: 1 },
      { question: 'Level curves show?', options: ['Derivatives', 'Constant function values', 'Integrals', 'Limits'], correct: 1 },
      { question: 'Double integral gives?', options: ['Line', 'Area', 'Volume', 'Surface'], correct: 2 },
      { question: 'Jacobian is used in?', options: ['Single variable', 'Change of variables', 'Limits', 'Series'], correct: 1 }
    ],
    calc_hard_2: [
      { question: 'First-order ODE has?', options: ['No derivatives', 'First derivative', 'Second derivative', 'nth derivative'], correct: 1 },
      { question: 'Separable ODE can be written as?', options: ['f(y)dy = g(x)dx', 'f(x) = g(y)', 'f\'(x) = 0', 'Any form'], correct: 0 },
      { question: 'Initial value problem requires?', options: ['Equation only', 'Initial condition', 'Boundary conditions', 'No conditions'], correct: 1 },
      { question: 'Linear ODE form: dy/dx + P(x)y = ?', options: ['0', 'Q(x)', 'y', 'x'], correct: 1 },
      { question: 'Integrating factor is?', options: ['e^∫P(x)dx', 'P(x)', '∫P(x)dx', 'Q(x)'], correct: 0 }
    ],
    calc_hard_3: [
      { question: 'Gradient (∇f) is?', options: ['Scalar', 'Vector', 'Matrix', 'Number'], correct: 1 },
      { question: 'Divergence measures?', options: ['Rotation', 'Spread of field', 'Circulation', 'Slope'], correct: 1 },
      { question: 'Curl measures?', options: ['Spread', 'Rotation', 'Direction', 'Magnitude'], correct: 1 },
      { question: 'Green\'s theorem relates?', options: ['Line & double integral', 'Point & line', 'Surface & volume', 'Derivatives'], correct: 0 },
      { question: 'Stokes\' theorem generalizes?', options: ['Fundamental theorem', 'Green\'s theorem', 'Divergence theorem', 'All theorems'], correct: 1 }
    ]
  };

  const subjects = ['All', 'Accountancy', 'IT', 'Business', 'Criminology', 'History', 'Biology', 'Calculus'];

  const filteredGames = selectedSubject === 'All' 
    ? games 
    : games.filter(game => game.subject === selectedSubject);

  const handleStartGame = (game: any) => {
    const questions = questionBank[game.id] || generateDefaultQuestions();
    setSelectedGame({ ...game, questions });
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  const generateDefaultQuestions = () => {
    return Array(5).fill(null).map((_, i) => ({
      question: `Question ${i + 1} - This game content is coming soon!`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0
    }));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers, answerIndex];
    setSelectedAnswers(newAnswers);

    if (currentQuestion < selectedGame.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const calculateResults = () => {
    const correctCount = selectedAnswers.filter((ans, idx) => 
      ans === selectedGame.questions[idx].correct
    ).length;
    const totalQuestions = selectedGame.questions.length;
    const percentage = (correctCount / totalQuestions) * 100;
    const xpEarned = Math.floor((percentage / 100) * selectedGame.xpReward);
    
    return { correctCount, totalQuestions, percentage, xpEarned };
  };

  const handleFinishGame = () => {
    const { xpEarned } = calculateResults();
    setCurrentUser({
      ...currentUser,
      points: (currentUser?.points || 0) + xpEarned
    });
    setSelectedGame(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
  };

  if (showResult && selectedGame) {
    const { correctCount, totalQuestions, percentage, xpEarned } = calculateResults();
    
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="text-center space-y-6">
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
              percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              <Trophy className="h-16 w-16 text-white" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-2">Game Complete!</h2>
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedGame.title}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Score</p>
                <p className="text-3xl font-bold">{correctCount}/{totalQuestions}</p>
              </div>
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy</p>
                <p className="text-3xl font-bold">{percentage.toFixed(0)}%</p>
              </div>
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>XP Earned</p>
                <p className="text-3xl font-bold text-yellow-600">+{xpEarned}</p>
              </div>
            </div>

            <div className="space-y-3 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Review Answers</h3>
              {selectedGame.questions.map((q: any, idx: number) => (
                <div key={idx} className={`p-4 rounded-lg text-left ${
                  selectedAnswers[idx] === q.correct 
                    ? (darkMode ? 'bg-green-900/30 border-2 border-green-600' : 'bg-green-50 border-2 border-green-500')
                    : (darkMode ? 'bg-red-900/30 border-2 border-red-600' : 'bg-red-50 border-2 border-red-500')
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 ${selectedAnswers[idx] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedAnswers[idx] === q.correct ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{q.question}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Your answer: <span className={selectedAnswers[idx] === q.correct ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                          {q.options[selectedAnswers[idx]]}
                        </span>
                      </p>
                      {selectedAnswers[idx] !== q.correct && (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Correct answer: <span className="text-green-600 font-semibold">{q.options[q.correct]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleFinishGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedGame) {
    const question = selectedGame.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedGame.questions.length) * 100;
    
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSelectedGame(null);
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                }}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h3 className="text-2xl font-bold">{selectedGame.title}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Question {currentQuestion + 1} of {selectedGame.questions.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Potential XP</p>
              <p className="text-xl font-bold text-yellow-600">+{selectedGame.xpReward}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
              <span className="text-sm font-bold text-purple-600">{currentQuestion + 1}/{selectedGame.questions.length}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className={`p-8 rounded-xl mb-6 ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <h4 className="text-2xl font-bold mb-8">{question.question}</h4>
            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={selectedAnswers.length > currentQuestion}
                  className={`p-5 rounded-xl text-lg font-medium transition-all text-left ${
                    selectedAnswers[currentQuestion] === idx
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 hover:border-purple-500' 
                        : 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-500 shadow-md hover:shadow-lg'
                  } ${selectedAnswers.length > currentQuestion ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102'}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      selectedAnswers[currentQuestion] === idx
                        ? 'bg-white text-purple-600'
                        : darkMode ? 'bg-gray-600' : 'bg-gray-100'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Learning Games</h2>
            <p className="text-purple-100">63 educational games across 7 subjects - Play and earn XP!</p>
          </div>
          <Gamepad2 className="h-16 w-16 text-purple-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total XP"
          value={currentUser?.points || 0}
          icon={Zap}
          color="yellow"
          darkMode={darkMode}
        />
        <StatCard
          label="Available Games"
          value={games.length}
          icon={Gamepad2}
          color="purple"
          darkMode={darkMode}
        />
        <StatCard
          label="Subjects"
          value="7"
          icon={BookOpen}
          color="blue"
          darkMode={darkMode}
        />
        <StatCard
          label="Difficulty Levels"
          value="3"
          icon={Target}
          color="orange"
          darkMode={darkMode}
        />
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Gamepad2 className="h-6 w-6 mr-2 text-purple-600" />
            Filter by Subject
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedSubject === subject
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : darkMode
                    ? 'bg-gray-750 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {subject} {subject !== 'All' && `(${games.filter(g => g.subject === subject).length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              darkMode={darkMode}
              onStart={() => handleStartGame(game)}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No games found for this subject
            </p>
          </div>
        )}
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
          Game Statistics by Subject
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.filter(s => s !== 'All').map(subject => {
            const subjectGames = games.filter(g => g.subject === subject);
            const totalXP = subjectGames.reduce((sum, g) => sum + g.xpReward, 0);
            
            return (
              <div key={subject} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                <p className="font-semibold mb-1">{subject}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {subjectGames.length} games
                </p>
                <p className="text-sm text-yellow-600 font-semibold">
                  Max {totalXP} XP
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Brain className="h-6 w-6 mr-2 text-blue-600" />
          How to Play
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              1
            </div>
            <h4 className="font-semibold mb-2">Choose a Game</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select from 63 games across 7 subjects with varying difficulty levels
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              2
            </div>
            <h4 className="font-semibold mb-2">Answer Questions</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Test your knowledge with multiple choice questions
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-yellow-600 text-white flex items-center justify-center text-xl font-bold mb-3">
              3
            </div>
            <h4 className="font-semibold mb-2">Earn XP & Level Up</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get XP based on your performance and climb the leaderboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameCard({ game, darkMode, onStart }: any) {
  const colorMap: any = {
    blue: 'from-blue-600 to-cyan-600',
    green: 'from-green-600 to-emerald-600',
    purple: 'from-purple-600 to-pink-600',
    orange: 'from-orange-600 to-red-600'
  };

  const difficultyColors: any = {
    Easy: 'bg-green-500',
    Medium: 'bg-yellow-500',
    Hard: 'bg-red-500'
  };

  return (
    <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-750' : 'bg-gray-50'} hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 ${
      darkMode ? 'border-gray-700 hover:border-purple-500' : 'border-gray-200 hover:border-purple-400'
    }`}>
      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${colorMap[game.color]} flex items-center justify-center mb-3 shadow-lg`}>
        <game.icon className="h-7 w-7 text-white" />
      </div>
      
      <h4 className="font-bold mb-1 text-sm">{game.title}</h4>
      <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
        {game.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded font-medium text-white ${difficultyColors[game.difficulty]}`}>
          {game.difficulty}
        </span>
        <div className="flex items-center space-x-1 text-yellow-600">
          <Zap className="h-4 w-4" />
          <span className="text-xs font-bold">+{game.xpReward} XP</span>
        </div>
      </div>

      <div className={`text-xs mb-3 px-2 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} text-center`}>
        {game.subject}
      </div>

      <button
        onClick={onStart}
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r ${colorMap[game.color]} text-white hover:opacity-90 hover:shadow-lg`}
      >
        Play Now
      </button>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, darkMode }: any) {
  const colorMap: any = {
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    blue: 'text-blue-600'
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-2 ${
      darkMode ? 'border-gray-700' : 'border-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className={`h-10 w-10 ${colorMap[color]}`} />
      </div>
    </div>
  );
}