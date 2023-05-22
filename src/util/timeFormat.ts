import dayjs from 'dayjs'

export const stampToMin = (stamp: number | string | Date): string => {
  if (!stamp) {
    return 'N/A'
  }
  const date = new Date(stamp)
  return dayjs(date).format('mm:ss')
}
export const formatDayTime = (time: number | string | Date): string => {
  if (!time) {
    return 'N/A'
  }
  const date = new Date(time)
  return dayjs(date).format('YYYY-MM-DD')
}
export const formateTime = (time: number | string | Date): string => {
  if (!time) {
    return 'N/A'
  }
  const date = new Date(time)
  return dayjs(date).format('YYYY年MM月DD日 HH:mm')
}