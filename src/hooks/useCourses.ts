// useCourses.ts
import { useCallback, useState } from "react";
import { CourseService } from "../services/course.service";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await CourseService.getEnrolled();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { courses, loading, fetchCourses };
};