// utils.ts
export function sum(a: number, b: number): number {
  return a + b
}
<<<<<<< HEAD

export function scaleGenerator(
  color: string,
  variants: number,
  minAlpha: number = 0.3,
  maxAlpha: number = 1,
  baseColor: string = '#ffffff'
): string[] {
  const alphas: number[] = []
  const step = (maxAlpha - minAlpha) / variants
  for (let i = 0; i < variants; i++) {
    const alpha = minAlpha + i * step
    alphas.push(alpha)
  }
  const colorRed = parseInt(color.slice(1, 3), 16)
  const colorGreen = parseInt(color.slice(3, 5), 16)
  const colorBlue = parseInt(color.slice(5, 7), 16)

  const baseColorRed = parseInt(baseColor.slice(1, 3), 16)
  const baseColorGreen = parseInt(baseColor.slice(3, 5), 16)
  const baseColorBlue = parseInt(baseColor.slice(5, 7), 16)

  const colors: string[] = []
  for (let i = 0; i < variants; i++) {
    const alpha = alphas[i]
    const red = Math.round((1 - alpha) * baseColorRed + alpha * colorRed)
    const green = Math.round((1 - alpha) * baseColorGreen + alpha * colorGreen)
    const blue = Math.round((1 - alpha) * baseColorBlue + alpha * colorBlue)
    const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    colors.push(color)
  }
  return colors
}
=======
  
>>>>>>> 4f43b1993cf382ef75e350a59cfbb64708451f03
