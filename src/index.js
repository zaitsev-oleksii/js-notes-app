import { activeNotes } from './storage.js';
import { renderTable, renderForms, renderTableContents } from './render.js';

renderTable();
renderTableContents(activeNotes);
renderForms();
