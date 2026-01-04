import AnnouncementCard from './AnnouncementCard';

const DATA = [
  { id: 1, author: 'Prof. Cruz', date: 'Oct 15, 2025', title: 'Midterm Changes', content: 'Please note that the midterm exam has been moved to Room 304.' },
  { id: 2, author: 'Prof. Cruz', date: 'Oct 10, 2025', title: 'Welcome to Class', content: 'Excited to start the semester with you all. Please read the syllabus.' },
];

const Announcements = () => (
  <div className="max-w-3xl mx-auto">
    {DATA.map(ann => <AnnouncementCard key={ann.id} {...ann} />)}
  </div>
);

export default Announcements;