const fs = require('fs')
// const book = {
//     title: 'Harry Potter',
//     author: 'J K Rolling'
// }

// const bookJson = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJson)
// console.log(bookJson)


// const parseData = JSON.parse(bookJson)
// console.log(parseData.author)
// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJson = dataBuffer.toString()
// const data = JSON.parse(dataJson)
// console.log(data.title)

const jsonData = JSON.parse((fs.readFileSync('1-json.json')).toString())
console.log(jsonData)
jsonData.name = 'Namrta'
jsonData.age = '24'
console.log("New:" + JSON.stringify(jsonData))

fs.writeFileSync('1-json.json', JSON.stringify(jsonData))