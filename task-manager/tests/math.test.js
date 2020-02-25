//Jest testing implementation
const { tip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')
test('Calculate Total Tip', () => {
      const total = tip(10, .3)
    expect(total).toBe(13)
      //   if(total !== 13){
    //       throw new Error('Total tip should be 13, got' + total)
    //   }
})

test('Calculate total with default', () => {
    const total = tip(10)
    expect(total).toBe(12)
}) 

test('Convert Fahrenheit to Celsius', () => {
    const cel = fahrenheitToCelsius(32)
    expect(cel).toBe(0)
})

test('Convert Celsius to Fahrenheit', () => {
    const fah = celsiusToFahrenheit(0)
    expect(fah).toBe(32)
})

// test('Async Test Demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000) 
// })
//Done approach for asynchronous test case
test('Should add test', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

//Async approach for asynchronous function (Mostly used)
test('Async Await test', async () => {
   const sum = await add(10,22)
   expect(sum).toBe(32)
})

// test('Hello World', () => {

// })

// test('This should fail', () => {
//     throw new Error('failure')
// })