//Object property shorthand

const name = 'Namrta'
const userAge = 24

const user = {
    name,
    age: userAge,
    loaction: 'Lucknow'
}

console.log(user)

//Object destructuring

const product = {
    label: 'Notebook',
    price: 10,
    stock: 200,
    salePrice: undefined,
    rating: 4.5
}

// const {label: prodlabel, stock, rating = 5} = product
// console.log(prodlabel)
// console.log(stock)
// console.log(rating)

//function arguments destructuring

//const transaction = (type, myProduct) => {
const transaction = (type, { label, stock }) => {  
   console.log(type, label, stock)
}

transaction('order', product)