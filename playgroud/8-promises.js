const doWorkPromise = new Promise((resolve, reject) => {
setTimeout(() => {
  // resolve([7, 4, 1])
  reject('Things went wrong!!')
  //we can't make two calls as it execute once only
  resolve([2, 3, 5])
},2000)
})

doWorkPromise.then((result) => {
    console.log('Success!!' + result)
}).catch((error) => {
    console.log('Error!' + error)
})

//                            fulfilled
//                           /
//Promise    == pending ==>
//                           \
//                             rejected            