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
