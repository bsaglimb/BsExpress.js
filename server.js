const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const allNotes = require('./miniature-eureka/Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//HTML Routes
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './miniature-eureka/Develop/public/index.html'));
});

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './miniature-eureka/Develop/public/notes.html'));
});


//Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../miniature-eureka/Develop/public/index.html'));
});

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './miniature-eureka/Develop/db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './miniature-eureka/Develop/db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}


// notes when the button is clicked by removing the note from db.json, saving and showing the updated database on the front end.
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});


//App listens with front end on this port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});