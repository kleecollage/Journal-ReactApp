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
            state.isSaving = false;
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
        setPhotosToActiveNote: (state, action) => {            
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active= null
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => (
                note.id !== action.payload)
            )
        },
    } 
}); 
// Action creators are generated for each case reducer function 
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions; 