/* eslint-disable no-param-reassign */
// import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { api, routes } from '../routes';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await api.get(routes.tasksPath());
    return response.data.items;
  },
);

export const fetchCompleteTask = createAsyncThunk(
  'tasks/fetchCompleteTask',
  async (id) => {
    const response = await api.patch(routes.taskPath(id), { isCompleted: true });
    return response.data;
  },
);

export const fetchAddTask = createAsyncThunk(
  'tasks/fetchAddTask',
  async (name) => {
    const response = await api.post(routes.tasksPath(), { name });
    return response.data;
  },
);

export const fetchRemoveTask = createAsyncThunk(
  'tasks/fetchRemoveTask',
  async (id) => {
    const response = await api.delete(routes.taskPath(id));
    return response.data;
  },
);

const tasksAdapter = createEntityAdapter();
const initialState = tasksAdapter.getInitialState({ loadingStatus: 'idle', error: null });

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks: tasksAdapter.addMany,
    addTask: tasksAdapter.addOne,
    removeTask: tasksAdapter.removeOne,
    completeTask: (state, action) => {
      const index = state.ids.indexOf(action.payload.id);
      if (index !== -1) {
        state.entities[action.payload.id].isCompleted = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        tasksAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(fetchCompleteTask.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchCompleteTask.fulfilled, (state, action) => {
        tasksSlice.caseReducers.completeTask(state, { payload: action });
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchCompleteTask.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(fetchAddTask.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAddTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchAddTask.rejected, (state, action) => {
        state.loadingStatus = 'loading';
        state.error = action.error;
      })
      .addCase(fetchRemoveTask.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRemoveTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchRemoveTask.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = tasksSlice;
export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export default tasksSlice.reducer;
