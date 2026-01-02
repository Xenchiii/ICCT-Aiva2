import { ApiService } from './api.service';

// grade.service.ts
export const GradeService = {
  getGradesByTerm: (term: string) => ApiService.request(`/grades?term=${term}`),
  // Calculates GWA based on Philippine 1.0-5.0 scale
  calculateGWA: (grades: any[]) => {
    const totalPoints = grades.reduce((sum, g) => sum + (g.grade * g.units), 0);
    const totalUnits = grades.reduce((sum, g) => sum + g.units, 0);
    return totalUnits === 0 ? 0 : Number((totalPoints / totalUnits).toFixed(2));
  }
};