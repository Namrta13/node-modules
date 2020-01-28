const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return 'Your notes...'
}

const readNote = (title) => {
     const notes = loadNotes()
     const reqNote = notes.find((note) => 
       note.title === title
     )

     if(reqNote){
         console.log(chalk.blue.italic.inverse(reqNote.title))
         console.log(reqNote.body)
     }
     else{
         console.log(chalk.red.bold('Note not found'))
     }
}
const removeNotes = (title) => {
    const notes = loadNotes()
    const noteExist = notes.filter((note) =>
        note.title ===  title
    )

    if(noteExist.length > 0){
    const notesKept = notes.filter((note) =>
        note.title != title
    )
    if(notesKept.length != 0 && notes.length > 1){
        console.log(chalk.bgGreen('Note Removed'))
        saveNotes(notesKept)
    }
    else if(notes.length === 1 && notesKept.length === 0 ){
        console.log(chalk.bgGreen('Note Removed'))
        fs.writeFileSync('notes.json')
    }
   }
    else{
       console.log(chalk.bgRed('No note found'))
    }
    

}
const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => 
    //      note.title === title
    // )
    const duplicateNote = notes.find((note) => 
         note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    }
    else{
        console.log('Title already taken')
    }
    
}

const loadNotes = () => {
    try{
        return JSON.parse(fs.readFileSync('notes.json').toString())
    }
    catch(e){
       return []
    }
   
 }

 const saveNotes = (notes) => 
       fs.writeFileSync('notes.json', JSON.stringify(notes))

const listNotes = () => {
    notes = loadNotes()
    console.log(chalk.blue.bold('Your Notes'))
    notes.forEach(element => {
        console.log(chalk.magenta.bold(element.title))
    })
}
 
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}