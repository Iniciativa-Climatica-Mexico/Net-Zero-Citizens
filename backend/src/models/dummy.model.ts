export const getGreeting = async (name: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hello ${name}`)
    }, 1000)
  })
}
