//import { Resolver } from "dns"

// const doWorkPromise = new Promise((resolve, reject) => {
// setTimeout(() => {
//   // resolve([7, 4, 1])
//   reject('Things went wrong!!')
//   //we can't make two calls as it execute once only
//   resolve([2, 3, 5])
// },2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success!!' + result)
// }).catch((error) => {
//     console.log('Error!' + error)
// })

//                            fulfilled
//                           /
//Promise    == pending ==>
//                           \
//                             rejected            


//* If we don't use chaining we get the results but the code becomes complex and redundant

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve(a + b)
    }, 2000)
  })
}

// add(1, 2).then((sum) => {
//   console.log(sum)
//   add(sum, 5).then((sum2) => {
//     console.log(sum2)
//   }).catch((e2) => {
//     console.log(e2)
//   })
// }).catch((e) => {
//   console.log(e)
// })

//* Promise chaining and we can return a promise from the then callback
add(1, 1).then((sum) => {
  console.log(sum)
  return add(sum, 4)
}).then((sum2) => {
  console.log(sum2)
}).catch((e) => {
  console.log(e)
})