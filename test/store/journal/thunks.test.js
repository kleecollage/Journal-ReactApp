import { expect } from "@jest/globals";
import { startNewNote } from "../../../src/store/journal/thunks";
import { addNewEmptyNote, setActiveNote, setSaving } from "../../../src/store/journal/journalSlice";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en JournalThunks', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    // *********************************************************** //
    test('startNewNote debe crear una nueva nota en blanco', async() => { 
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } });
        await (startNewNote()(dispatch, getState));

        expect(dispatch).toHaveBeenCalledWith( setSaving() );
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls:[],
        }));
        expect(dispatch).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls:[],
        }));
        // Borrar de firebase
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        
        await Promise.all(deletePromises);
    })
    // *********************************************************** //

 })