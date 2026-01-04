// Explicit global type declarations
interface Storage {
  readonly length: number;
  clear(): void;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
  [key: string]: any;
}

interface Console {
  error(...data: any[]): void;
  log(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
}

interface Window {
  sessionStorage: Storage;
}

declare const localStorage: Storage;
declare const sessionStorage: Storage;
declare const console: Console;
declare const window: Window;

const STORAGE_PREFIX = 'icct_aiva_';

export const storage = {
  set: (key: string, value: any): void => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue || null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export const appSessionStorage = {
  set: (_key: string, _value: any): void => {
    try {
      const serialized = JSON.stringify(_value);
      sessionStorage.setItem(`${STORAGE_PREFIX}${_key}`, serialized);
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  },

  get: <T>(_key: string, defaultValue?: T): T | null => {
    try {
      const item = sessionStorage.getItem(`${STORAGE_PREFIX}${_key}`);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue || null;
    }
  },

  remove: (_key: string): void => {
    try {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${_key}`);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  },

  clear: (): void => {
    try {
      Object.keys(sessionStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => sessionStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  },
};