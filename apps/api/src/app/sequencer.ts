import { Express } from 'express';
import { Note, getAllNotes } from '@musique/audio';

const notes: Note[] = getAllNotes();
const sequence: Note[] = [];

export function addNotesRoutes(app: Express) {
  app.get('/api/notes', (req, resp) => resp.send(notes));
  app.post('/api/addNotetoSequence', (req, resp) => {
    const data = req.body;
  });
}
