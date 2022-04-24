import { getCurrentDateTime } from "./utils.js";

const getStorage = (initNotes = []) => {
  const notes = initNotes;
  return {
    size: () => notes.length,
    getNotes: () => notes.slice(),
    getById: (id) => notes.filter((note) => (note.id === id))[0],
    addNote: (data) => {
      const { id, content, category } = data;
      let newNoteId = id;
      if (!newNoteId){
        const maxId = notes.map(note => note.id).reduce((maxId, currId) => ((currId > maxId) ? currId : maxId))
        newNoteId = maxId + 1
      }
      notes.push({
         id: newNoteId,
         content: content,
         category: category,
         creationTime: getCurrentDateTime()
      });
    },
    editNote: (data) => {      // Mb change to indexOf variant
      const { id, content, category } = data;
      const noteToEdit = notes.filter(note => (note.id === id))[0];
      noteToEdit.content = content;
      noteToEdit.category = category;
    },
    deleteNote: (id) => {
      // for (let idx = 0; i < notes.length; idx++)
      //   if (notes[idx].id === id)
      //     notes.splice(idx, 1);
      for (const [idx, note] of notes.entries())
        if (note.id === id)
          notes.splice(idx, 1);
    },
    [Symbol.iterator]: () => notes[Symbol.iterator](),
  }
}


const initialNotes = [
  { id: 1, content: 'Note 1', category: 'Task', creationTime: '22/04/2022' },
  { id: 2, content: 'Note 2', category: 'Random Thought', creationTime: '10/04/2022' },
  { id: 3, content: 'Note 3', category: 'Idea', creationTime: '14/04/2022' },
  { id: 4,
    content: 'I\'m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
    category: 'Task',
    creationTime: getCurrentDateTime()
  }
];

const activeNotes = getStorage(initialNotes);
const archivedNotes = getStorage();


export { activeNotes, archivedNotes };
