// const square = function(x){
//     return x * x
// }

// const square = (x) => {
//   return x * x
// }
//const square = (x) => x*x

//console.log(square(4))
//alternative sytax if want to set methods on object
const event = {
    name: 'Birthday Party',
    guestList: ['Namrta', 'Arpita', 'Divya'],
    //es6 method approach
    printGuestList() {
        console.log('Guest List for ' + this.name)
        this.guestList.forEach(element => {
            console.log(element + ' is attending the ' + this.name)
        });
    }
}

event.printGuestList()