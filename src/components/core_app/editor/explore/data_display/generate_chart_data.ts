export default (data: any[]) => {
  return {
    labels: data && data.map(item => trimAndChunkString(item.key)),
    datasets: [{
      label: 'Number of occurrences',
      data: data && data.map(item => item.count),
      backgroundColor: [
        "#25CCF7","#FD7272","#54a0ff","#00d2d3",
        "#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
        "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
        "#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
        "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
        "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
        "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
        "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
        "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"
    ],
      borderWidth: 0,
      maxBarThickness: 60,
    }]
  }
}

let eachSlice = function (string, size):string[] {
  let result:string[] = []
  for (var i = 0, l = string.length; i < l; i += size){
    result.push(string.slice(i, i + size))
  }

  return result
}

let trimAndChunkString = (string: string) => {
  const trimmedString = string.slice(0, 30)
  const words = trimmedString.split(' ')
  return words.map(word => eachSlice(word, 10)).flat()
}
