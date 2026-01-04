import CourseCard from './CourseCard';
import './CourseCatalog.css';

const COURSES = [
  { id: '1', code: 'IT 302', title: 'Web Development', instructor: 'Prof. A. Cruz', schedule: 'MWF 10:00 AM', color: 'bg-blue-600' },
  { id: '2', code: 'CS 201', title: 'Data Structures', instructor: 'Dr. B. Santos', schedule: 'TTH 1:00 PM', color: 'bg-emerald-600' },
  { id: '3', code: 'MATH 101', title: 'Calculus I', instructor: 'Engr. C. Reyes', schedule: 'MWF 8:00 AM', color: 'bg-purple-600' },
  { id: '4', code: 'ENG 102', title: 'Technical Writing', instructor: 'Ms. D. Dizon', schedule: 'SAT 9:00 AM', color: 'bg-orange-500' },
];

const CourseCatalog = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COURSES.map(course => <CourseCard key={course.id} {...course} />)}
      </div>
    </div>
  );
};

export default CourseCatalog;