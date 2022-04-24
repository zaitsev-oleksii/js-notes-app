import { parseDates } from "./utils.js";
import { categories, tableConfig, tableHeaderTemplate } from "./config.js";
import { addNoteHandler,
         editNoteHandler, 
         deleteNoteHandler, 
         archiveNoteHandler, 
         dearchiveNoteHandler, 
         toggleViewHandler } from './handlers.js';




const appendChildren = (parent, children) => {
  for (const child of children) parent.appendChild(child);
}

const renderElement = (tag, attributes, contents) =>{
  const element = document.createElement(tag);
  for (const key in attributes) element.setAttribute(key, attributes[key]);
  if (contents) element.innerHTML = contents;
  return element;
}

const renderButton = (attributes, handler) => {
  const button = renderElement('input', attributes);
  if (handler) button.addEventListener('click', handler);
  return button;
}

const renderSelect = (options, attrs) => {
  const select = renderElement('select', attrs)
  for (const option of options){
    const optionElem = renderElement('option', { value: option }, option);
    select.appendChild(optionElem);
  }
  return select;
}

const renderInput = (attributes) => renderElement('input', attributes);

const clearTableContents = () => {
  const table = document.querySelector('#notes');

  const rows = document.getElementsByClassName('note');
  while (rows.length > 0)
      table.removeChild(rows[0]);
}

const renderSummary = (active, archived) => {
  clearSummary();
  
  const table = document.querySelector('#notes');
  const row = renderElement('tr', { class: 'summary '});
  const activeCell = renderElement('td', {}, 'Active: ' + active);
  const archivedCell = renderElement('td', {}, 'Archived: ' + archived);

  appendChildren(row, [activeCell, archivedCell]);
  table.appendChild(row);
}

const clearSummary = () => {
  const table = document.querySelector('#notes');
  const rows = document.getElementsByClassName('summary');
  while (rows.length > 0)
      table.removeChild(rows[0]);
}

const renderTable = () => {
  const tableBlock = document.querySelector('#table-block');
  const table = renderElement('table', { id: 'notes' }, tableHeaderTemplate);
  
  tableBlock.appendChild(table);
}

const renderTableContents = (data) => {
  const table = document.querySelector('#notes');

  clearTableContents();

  for (const note of data){
    const row = renderElement('tr', { class: 'note' });

    for (const key in tableConfig){
      const cell = renderElement('td');
      if (tableConfig[key] in note)
        cell.innerHTML = note[tableConfig[key]];
      if (tableConfig[key] === 'contentDates'){
        const contentDates = parseDates(note['content']);
        if (contentDates)
          cell.innerHTML = contentDates.toString();
      }
      row.appendChild(cell);
    }

    table.appendChild(row);
  }
}

const renderAddNoteForm = () => {
  const addNoteBlock = renderElement('div', { id: 'addNoteBlock'});
  const addNoteContent = renderInput({ id: 'addNoteContent', placeholder: 'Note text'});
  const addNoteCategory = renderSelect(categories, { id: 'addNoteCategory' });
  const addNoteButton = renderButton({ id: 'addNoteButton', type: 'button', value: 'Add Note'}, addNoteHandler);

  appendChildren(addNoteBlock, [addNoteContent, addNoteCategory, addNoteButton]);

  return addNoteBlock;
}

const renderEditNoteForm = () => {
  const editNoteBlock = renderElement('div', { id: 'editNoteBlock' });
  const editNoteId = renderInput({ id: 'editNoteId', placeholder: 'Edit id'});
  const editNoteContent = renderInput({ id: 'editNoteContent', placeholder: 'Note text'});
  const editNoteCategory = renderSelect(categories, { id: 'editNoteCategory' });
  const editNoteButton = renderButton({ id: 'editNoteButton', type: 'button', value: 'Edit Note'}, editNoteHandler);

  appendChildren(editNoteBlock, [editNoteId, editNoteContent, editNoteCategory, editNoteButton]);

  return editNoteBlock;
}

const renderDeleteNoteForm = () => {
  const deleteNoteBlock = renderElement('div', { id: 'deleteNoteBlock' });
  const deleteNoteId = renderInput({ id: 'deleteNoteId', placeholder: 'Note id'});
  const deleteNoteButton = renderButton({ id: 'deleteNoteButton', type: 'button', value: 'Delete Note' }, deleteNoteHandler );

  appendChildren(deleteNoteBlock, [deleteNoteId, deleteNoteButton]);

  return deleteNoteBlock;
}

const renderArchiveNoteForm = () => {
  const archiveNoteBlock = renderElement('div', { id: 'archiveNoteBlock'});
  const archiveNoteId = renderInput({ id: 'archiveNoteId', placeholder: 'Note id'});
  const archiveNoteButton = renderButton({ id: 'archiveNoteButton', type: 'button', value: 'Archive Note' }, archiveNoteHandler);

  appendChildren(archiveNoteBlock, [archiveNoteId, archiveNoteButton]);

  return archiveNoteBlock;
}

const renderDearchiveNoteForm = () => {
  const dearchiveNoteBlock = renderElement('div', { id: 'dearchiveNoteBlock'});
  const dearchiveNoteId = renderInput({ id: 'dearchiveNoteId', placeholder: 'Note id'});
  const dearchiveNoteButton = renderButton({ id: 'dearchiveNoteButton', type: 'button', value: 'Dearchive Note'}, dearchiveNoteHandler);

  appendChildren(dearchiveNoteBlock, [dearchiveNoteId, dearchiveNoteButton]);

  return dearchiveNoteBlock;
}

const renderForms = () => {
  const forms = document.querySelector('#forms');

  const addNoteBlock = renderAddNoteForm();
  const editNoteBlock = renderEditNoteForm();
  const deleteNoteBlock = renderDeleteNoteForm();
  const archiveNoteBlock = renderArchiveNoteForm();
  const dearchiveNoteBlock = renderDearchiveNoteForm();

  const viewArchivedButton = renderButton({ 
    id: 'toggleView',
    type: 'button',
    value: 'Show/Hide Achived',
    style: 'margin-top:20px'
  }, toggleViewHandler);

  appendChildren(forms, [
    addNoteBlock, editNoteBlock, deleteNoteBlock,
    archiveNoteBlock, dearchiveNoteBlock, viewArchivedButton
  ]);
}

export { renderTable, renderTableContents, renderSummary, renderForms };