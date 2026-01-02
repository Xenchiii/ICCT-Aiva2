export const THEME_CONFIG = {
  APP_NAME: 'ICCT Aiva',
  
  COLORS: {
    PRIMARY: '#003049',    // Dark Blue
    SECONDARY: '#FCE205',  // Bumblebee
    ACCENT: '#4682B4',     // Steel Blue
    
    STATUS: {
      SUCCESS: '#10B981',
      WARNING: '#F59E0B',
      ERROR: '#EF4444',
      INFO: '#3B82F6',
    }
  },

  LAYOUT: {
    SIDEBAR_WIDTH: '260px',
    SIDEBAR_COLLAPSED_WIDTH: '80px',
    HEADER_HEIGHT: '64px',
  },

  ANIMATION: {
    TRANSITION_SPEED: '0.3s',
  },
  
  // Philippine Grading System Scale
  GRADING_SCALE: {
    EXCELLENT: 1.00,
    PASSING: 3.00,
    CONDITIONAL: 4.00,
    FAILED: 5.00,
  }
} as const;