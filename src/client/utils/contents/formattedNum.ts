const formattedNum = (num: number, maxAmount: number = 0, cal: boolean = false) => {
  const options = { 
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
  };
  const max = num > maxAmount ? maxAmount : num
  const formatted = Number(cal ? max : num).toLocaleString('en', options);
  return formatted
}

export default formattedNum