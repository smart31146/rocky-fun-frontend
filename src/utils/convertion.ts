export const convertMarketCapNumber = (number: string | number) => {
  const currentNumber = parseFloat(typeof number === "string" ? number : number.toString()) / 1000
  return `${currentNumber % 1 === 0 ? currentNumber : currentNumber.toFixed(2)}k`
}

export const byteToMegabyte = (value: number) => {
  return value / (1024 * 1024)
}
