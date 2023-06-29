export function formatCount(count: number): string {
  let unit = ''
  let result = ''
  switch (true) {
    case count < 100000:
      result = count + ''
      unit = ''
      break
    case count >= 100000 && count < 100000000:
      result = (count / 10000).toFixed(0)
      unit = '万'
      break
    case count >= 100000000:
      result = (count / 100000000).toFixed(2)
      unit = '亿'
      break
  }

  return result + unit
}

export const formatAr = (arr: any[]): string => {
  let res: string = ''
  arr.forEach((item, index) => {
    const l = index === arr.length - 1 ? '' : '/'
    res += item.name + l
  })
  return res
}
// 不满10的数字前面添加0
export const indexMethod = (index: number) => {
  let res = ''
  if (index < 9) {
    res = '0' + (index + 1)
  } else {
    res = String(index + 1)
  }
  return res
}
