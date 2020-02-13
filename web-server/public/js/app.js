console.log('Client side javascript is loaded')
//async request in javascript then part of Promises
//configured the browser with the node.js backend

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    document.querySelector('table').hidden = true
    document.getElementById('errorMessage').hidden = false
    document.getElementById('errorMessage').textContent = 'Loading..'
    
    fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        
       if(data.error){
           document.querySelector('table').hidden = true
           document.getElementById('errorMessage').hidden = false
          document.getElementById('errorMessage').textContent = data.error
          // alert(data.error)
           return console.log(data.error)
       } else {
        document.getElementById('errorMessage').hidden = true
        document.querySelector('table').hidden = false
        document.querySelector('table').rows[1].innerHTML = data.address
       document.querySelector('table').rows[3].innerHTML = data.forecast
       console.log(data.address)
        console.log(data.forecast)
       }
    })
})  
    console.log('testing!')
})