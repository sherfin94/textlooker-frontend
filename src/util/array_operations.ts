export let pluck = (list, property) => {
  return list.map(item => item[property])
}