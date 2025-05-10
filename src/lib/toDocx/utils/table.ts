export const widthToPercent = (widths: number[]): number[] => {
  const wa = widths.reduce((acc: number, v: number) => acc + v, 0)
  return widths.map(v => Math.floor((v / wa) * 100))
}
