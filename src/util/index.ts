export function formatCount (count: number): string {
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

export const formatAr = (arr: any[],reg?:string): string => {
  let res: string = ''
  arr.forEach((item, index) => {
    const l = index === arr.length - 1 ? '' : '/'
    res +=reg?item[reg]+l:item.name + l
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
// 获取范围随机数
export function getRandomInt (min: number, max: number) {
  min = Math.ceil(min) // 向上取整，确保最小值为整数
  max = Math.floor(max) // 向下取整，确保最大值为整数
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export function searchKeyword(singleStr: string, str: string): boolean {
  if (!str || !singleStr) return false
  return str.includes(singleStr)
}
export {
  stampToMin,
  formatDayTime,
  formateTime,
  minToSecond
} from './timeFormat'

export {
  setToken,
  getToken,
  removeToken
} from './storage'

export {
  request,
  instance
} from './request'
export {
  FullLoading,
  PartLoading
} from './loading'