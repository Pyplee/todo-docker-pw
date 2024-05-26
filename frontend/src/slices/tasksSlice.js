/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { api, routes } from '../routes';
import { actions as cardsActions } from './cardsSlice.js';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await api.get(routes.tasksPath());
    return response.data.items;
  },
);

export const fetchCompleteTask = createAsyncThunk(
  'tasks/fetchCompleteTask',
  async (task) => {
    const { id } = task;
    await api.patch(routes.taskPath(id));
    const updatedTask = { ...task, isComplited: !task.isComplited };
    return updatedTask;
  },
);

export const fetchAddTask = createAsyncThunk(
  'tasks/fetchAddTask',
  async ({ title, description, cardId }) => {
    const response = await api.post(routes.tasksPath(), { title, description, cardId });
    const newTask = { title, description, cardId, id: response.data.id };
    return newTask;
  },
);

export const fetchRemoveTask = createAsyncThunk(
  'tasks/fetchRemoveTask',
  async (id) => {
    await api.delete(routes.taskPath(id));
    return id;
  },
);

export const fetchRemoveCompTasks = createAsyncThunk(
  'tasks/fetchRemoveCompTasks',
  async (ids) => {
    await api.delete(routes.tasksDelCompPath());
    return ids;
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
    removeTasks: tasksAdapter.removeMany,
    updateTask: tasksAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(cardsActions.removeCard, (state, { payload }) => {
        const cardId = payload;
        const restEntities = Object.values(state.entities).filter((e) => e.cardId !== cardId);
        tasksAdapter.setAll(state, restEntities);
      })
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
        const task = action.payload;
        const { id, isComplited } = task;
        tasksAdapter.updateOne(state, {
          id,
          changes: {
            isComplited,
          }
        });
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
      })
      .addCase(fetchRemoveCompTasks.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRemoveCompTasks.fulfilled, (state, action) => {
        tasksAdapter.removeMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchRemoveCompTasks.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = tasksSlice;
export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export default tasksSlice.reducer;
