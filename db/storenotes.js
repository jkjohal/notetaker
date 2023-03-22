//import required dependencies
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//CRUD for notes
class StoreNote {
    read() {
      return readFileAsync('db/db.json');
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
  
      
      const newNote = { title, text };
  
      
      return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    };
  
    deleteNote(note){
      app.delete('/notes/:id', (req, res)) => {
        const itemId = req.params.id;
        res.status(204).send();
    }
  };
};
  module.exports = new StoreNote();
