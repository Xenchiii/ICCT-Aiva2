import React, { createContext, useState } from 'react';

const CourseContext = createContext<any>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [materials, setMaterials] = useState([]);

  const enrollInCourse = () => {
    // Credit hour tracking logic here
  };

  return (
    <CourseContext.Provider value={{ currentCourse, materials, enrollInCourse, setCurrentCourse, setMaterials }}>
      {children}
    </CourseContext.Provider>
  );
};