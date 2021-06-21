
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

const userTimezone = dayjs.tz.guess()

let toTwoDigits = (n:number) => {
  let numString = n.toString()
  if(numString.length === 1) numString = `0${numString}`
  return numString
}

export let today = ():string => {
  const today = new Date(Date.now())
  const year = today.getFullYear()
  const month = toTwoDigits(today.getMonth() + 1)
  const day = toTwoDigits(today.getDate())
  return `${year}-${month}-${day}`
}

export let now = ():string => {
  const now = new Date(Date.now())
  const hours = toTwoDigits(now.getHours())
  const minutes = toTwoDigits(now.getMinutes())
  return `${hours}:${minutes}`
}

export let toUnixTimestamp = (date:string, time:string):string => {
  let givenDate = new Date(date)
  const [hours, minutes] = time.split(':')
  givenDate.setHours(parseInt(hours))
  givenDate.setMinutes(parseInt(minutes))
  const timestamp = Math.floor(givenDate.getTime())
  return `${timestamp}`
}

export let toServerDateFormat = (date:string, time:string):string => {
  let fullDate = `${date} ${time}`
  fullDate = dayjs(fullDate, 'YYYY-MM-DD HH:mm').tz(userTimezone).format('YYYY-MM-DDThh:mm:ssZ')
  return fullDate
}