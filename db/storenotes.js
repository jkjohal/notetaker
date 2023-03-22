//import required dependencies
const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//CRUD for notes
class StoreNote {
    read() {
      return readFileAsync('db/db.json', 'utf8');
    }
  
    write(note) {
      return writeFileAsync('db/db.json', JSON.stringify(note));
    }
  
    getNotes() {
      return this.read().then((notes) => {
        let parsedNotes;
  
        
        try {
          parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
          parsedNotes = [];
        }
  
        return parsedNotes;
      });
    }
  
    createNewNote(note) {
      const { title, text } = note;
      if (!title || !text) {
        throw new Error("You must enter a title and text for this note!");
      }
  
      
      const newNote = { title, text, id: uuidv1() };
  
      
      return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
  
  }
  
  module.exports = new StoreNote();
