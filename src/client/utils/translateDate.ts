const translateDate = (isoDate: Date = new Date(Date.now()), parse: boolean =false) => {
  const newDate = isoDate.toLocaleDateString('zh-hk')
  const month = newDate.split('/')[1]
  const date = newDate.split('/')[0]
  const year = newDate.split('/')[2]

  // const monthStr = month > 9 ? month.toString() : '0' + month.toString()
  // const dateStr = date > 9 ? date.toString() : '0' + date.toString()

  isoDate.toISOString().split('T')[0]
  const offset = isoDate.getTimezoneOffset()
  isoDate = new Date(isoDate.getTime() - (offset * 60 * 1000))

  if (parse) return isoDate.toISOString().split('T')[0]
  else return `${year}年${month}月${date}日`
}

export default translateDate