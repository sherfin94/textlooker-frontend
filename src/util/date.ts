
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

export let toServerDateFormat = (date:string, time:string):string => {
  let givenDate = new Date(date)
  const [hours, minutes] = time.split(':')
  givenDate.setHours(parseInt(hours))
  givenDate.setMinutes(parseInt(minutes))
  const timestamp = Math.floor(givenDate.getTime())
  return `${timestamp}`
}