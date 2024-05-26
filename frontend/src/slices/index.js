// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice.js';
import cardsReducer from './cardsSlice.js';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    cards: cardsReducer,
  },
});
