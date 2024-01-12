const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const notes = require('../db/db.json');
const fs = require('fs');
const path = require('path');


function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];

  body.id = uuidv4();


  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}



function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
      let note = notesArray[i];

      // Check if note and note.id are defined
      if (note && note.id && note.id == id) {
          notesArray.splice(i, 1);
          fs.writeFileSync(
              path.join(__dirname, '../db/db.json'),
              JSON.stringify(notesArray, null, 2)
          );

          break;
      }
  }
}



// show all notes in json data
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
  });

  router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
  });  


 // notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end. 
  router.delete('/notes/:id' , (req, res) => {
    const params = req.params.id
    deleteNote(params, notes);
    res.send('your note has been deleted');
  });

  module.exports = router;