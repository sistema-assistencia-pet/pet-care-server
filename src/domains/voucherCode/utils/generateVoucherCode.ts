export function generateVoucherCode (): string {
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length)
    code += CHARACTERS[randomIndex]
  }

  return code
}
