/**const fs = require('fs')

//fs.writeFileSync('notes.txt', 'My nmae is Namrta')
fs.appendFileSync('notes.txt', 'I work in a company')*/
//const name = require('./utils.js')

//const name = 'Namrta'
// const add = require('./utils')

// const sum =add(1,2)
// console.log(sum)
//const validator = require('validator')
//console.log(validator.isEmail('abc@abc.com'))
//console.log(validator.isURL('https://localhost:4200'))


// const notes = notesVal()
// console.log(notes)

// console.log(chalk.red.bold.inverse('Error'))

// console.log(process.argv[2])
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

//const command = process.argv[2]

// if (command === 'add') {
//     console.log('Adding note')
// } 
// else if(command === 'remove'){
//     console.log('Removing Notes')
// }
//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
       title: {
           describe: 'Note title',
           demandOption: true,
           type: 'string'
       },
       body: {
           describe: 'Body of the Post',
           demandOption: true,
           type: 'string'
       }
    },
    handler:  (argv) => {
      //  console.log('Adding a new note', argv)
        // console.log('Title Of Post: ' + argv.title)
        // console.log('Body: ' + argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

//create remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
        describe: 'Title of note to Remove',
        demandOption: true,
        type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNotes(argv.title)
    }
})
//listing command
yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: () => {
      notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
       title: {
           describe: 'Title to read the note',
           demandOption: true,
           type: 'string'
       }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})

yargs.parse()
//console.log(process.argv)
//console.log(yargs.argv)