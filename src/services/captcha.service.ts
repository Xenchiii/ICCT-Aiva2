import { ApiService } from './api.service';

export const CaptchaService = {
  // Fetches a new captcha challenge (image/key)
  generate: () => ApiService.request<{ image: string; key: string }>('/captcha/new'),

  // Verifies the user's input before allowing a form submission
  verify: (key: string, userInput: string) => 
    ApiService.request<{ success: boolean }>('/captcha/verify', {
      method: 'POST',
      body: JSON.stringify({ key, userInput }),
    }),
};