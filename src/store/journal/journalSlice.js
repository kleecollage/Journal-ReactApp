import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({ 
    name: 'journal', 
    initialState: { 
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    }, 
    reducers: { 
        savingNewNote: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
            
        },
        addNewEmptyNote: (state, action) => {
            state.isSaving = false;
            state.notes.push(action.payload);
        },
        setActiveNote: (state, action) => {
            state.active = action.payload
        },
        setNotes: (state, action) => {
            state.notes = (action.payload)
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => (
                note.id === action.payload.id ? action.payload : note
            ))
            state.messageSaved = `${action.payload.title}, actualizado correctamente`
        },
        deleteNoteById: (state, action) => {
            
        },
    } 
}); 
// Action creators are generated for each case reducer function 
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions; 