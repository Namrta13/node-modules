// setTimeout(() => {
//  console.log('Two sec are over')
// }, 2000)

// const names = ['Namrta', 'Aayush', 'Arpita', 'Jen', 'Dev', 'Mia']
// const shortNames = names.filter((name) => 
// name.length <= 4 )
// console.log(shortNames)


// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitue: 0,
//             longitude: 0
//         }
//        // return data
//        callback(data)
//     }, 2000)
// }

// geocode('philadelphia', (data) => {
// console.log(data)
// })

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// const add = (num1, num2, callback) => {
//     setTimeout(() => {
//        const sum = num1 + num2
//        callback(sum)
//     }, 2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })
const doWorkCallback = (callback) => {
  setTimeout(()=> {
//callback('This is my error', undefined)
 callback(undefined, [1, 4, 7])  
}, 2000)
}

doWorkCallback((error, result) => {
 if(error){
     return console.log(error)
 }
 console.log(result)
})