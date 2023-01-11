export const greetUser = name => {
  const hour = new Date().getHours()

  if (hour >= 6 && hour <= 12) {
    return `Bom dia, ${name}!`
  }

  if (hour > 12 && hour <= 19) {
    return `Boa tarde, ${name}!`
  }

  if (hour > 19 && hour < 6) {
    return `Boa noite, ${name}!`
  }
}
