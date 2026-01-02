// useCourses.ts
import { useState, useCallback, useEffect} from 'react';
import { CourseService } from '../services/course.service';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const data = await CourseService.getEnrolled();
    setCourses(data);
    setLoading(false);
  };

  return { courses, loading, fetchCourses };
};