import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
    notes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

// fetch all notes
export const getNotes = createAsyncThunk('notes/get',async (_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.getAll(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// create note
export const createNote = createAsyncThunk('notes/create', async(data,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.create(data,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// update note
export const updateNote = createAsyncThunk('notes/update', async(data,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.update(data,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// delete note
export const deleteNote = createAsyncThunk('notes/delete', async(noteID,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService._delete(noteID,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        resetNotes: (state)=>initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getNotes.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getNotes.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getNotes.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.notes = action.payload;
        })
        .addCase(createNote.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createNote.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(createNote.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.notes.push(action.payload);
        })
        .addCase(updateNote.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateNote.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateNote.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.notes = state.notes.map(note=>(
                note._id==action.payload._id ? action.payload : note
            ))
        })
        .addCase(deleteNote.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteNote.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteNote.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.notes = state.notes.filter(note=>(note._id!=action.payload._id))
        })


    }
})

export const {resetNotes} = noteSlice.actions;
export default noteSlice.reducer;