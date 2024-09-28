import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice.js';
import userReducer from './userSlice.js';
import noteReducer from './noteSlice.js';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: userReducer,
        notes: noteReducer,
    }
})

export default store;