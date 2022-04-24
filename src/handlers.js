import { activeNotes, archivedNotes } from './storage.js';
import { renderTableContents, renderSummary } from './render.js';
import { categories } from './config.js';


const addNoteHandler = () => {
  const addNoteContent = document.querySelector('#addNoteContent');
  const addNoteCategory = document.querySelector('#addNoteCategory');
  const content = addNoteContent.value;
  const category = addNoteCategory.value;

  const categoryExists = (categories.indexOf(category) !== -1);
  if (content && categoryExists)
    activeNotes.addNote({ content, category });

  renderTableContents(activeNotes);
  renderSummary(activeNotes.size(), archivedNotes.size());
}

const editNoteHandler = () => {
  const editNoteId = document.querySelector('#editNoteId');
  const editNoteContent = document.querySelector('#editNoteContent');
  const editNoteCategory = document.querySelector('#editNoteCategory');
  const id = +editNoteId.value;
  const content = editNoteContent.value;
  const category = editNoteCategory.value;

  const categoryExists = (categories.indexOf(category) !== -1);
  const note = activeNotes.getById(id);

  if (note && content && categoryExists)
    activeNotes.editNote({ id, content, category });

  renderTableContents(activeNotes);
  renderSummary(activeNotes.size(), archivedNotes.size());
}

const deleteNoteHandler = () => {
  const deleteNoteId = document.querySelector('#deleteNoteId');
  const id = +deleteNoteId.value;

  const note = activeNotes.getById(id);

  if (note)
    activeNotes.deleteNote(id);

  renderTableContents(activeNotes);
  renderSummary(activeNotes.size(), archivedNotes.size());
}

const archiveNoteHandler = () => {
  const archiveNoteId = document.querySelector('#archiveNoteId');
  const id = +archiveNoteId.value;

  const noteToArchive = activeNotes.getById(id);

  if (noteToArchive)
    archivedNotes.addNote(noteToArchive)
    activeNotes.deleteNote(id);

  renderTableContents(activeNotes);
  renderSummary(activeNotes.size(), archivedNotes.size());
}

const dearchiveNoteHandler = () => {
  const dearchiveNoteId = document.querySelector('#dearchiveNoteId');
  const id = +dearchiveNoteId.value;

  const noteToDearchive = archivedNotes.getById(id);

  if (noteToDearchive)
    activeNotes.addNote(noteToDearchive)
    archivedNotes.deleteNote(id);

  renderTableContents(activeNotes);
  renderSummary(activeNotes.size(), archivedNotes.size());
}

let viewArchivedFlag = true;
const toggleViewHandler = () => {
  // renderTableContents(activeNotes);
  if (viewArchivedFlag)
    renderTableContents(archivedNotes);
  else
    renderTableContents(activeNotes);
  renderSummary(activeNotes.size(), archivedNotes.size());
  viewArchivedFlag = !viewArchivedFlag;
}

export { addNoteHandler, editNoteHandler, deleteNoteHandler, archiveNoteHandler, dearchiveNoteHandler, toggleViewHandler };