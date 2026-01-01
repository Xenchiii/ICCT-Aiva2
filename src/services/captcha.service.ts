export const captchaService = {
  generate: async ()=>({image: null, token: ''}),
  verify: async (token:string, answer:string)=>({ok: answer.toLowerCase() === 'human'})
}
