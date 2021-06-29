export let pluck = (list, property) => {
  return list.map(item => item[property])
}

export let eachSlice = async function (list: string | any[], size: number, callback: (arg0: any) => Promise<any>) {
  for (var i = 0, l = list.length; i < l; i += size){
    await callback(list.slice(i, i + size))
  }
}

export let dedupe = (list: string[]) => {
  return [...new Set(list)]
}