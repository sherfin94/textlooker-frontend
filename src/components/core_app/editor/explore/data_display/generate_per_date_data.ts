import { pluck, dedupe } from "../../../../../util/array_operations"

export default (data) => {
  const dates = dedupe(pluck(data, "date"))
  const items = dedupe(pluck(data, "value"))

  let result = {}
  for(let dateIndex in dates) {
    for(let itemIndex in items) {
      result[items[itemIndex]] = {
        data: data
          .filter(countItem => (countItem.date === dates[dateIndex] && countItem.value === items[itemIndex]))
          .map(countItem => countItem.count),
        label: items[itemIndex]
      }
    }
  }

  return [dates, Object.values(result)]
}