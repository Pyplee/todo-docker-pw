/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { api, routes } from '../routes';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async () => {
    const response = await api.get(routes.cardsPath());
    return response.data.items;
  },
);

export const fetchAddCard = createAsyncThunk(
  'cards/fetchAddCard',
  async ({ title }) => {
    const response = await api.post(routes.cardsPath(), { title });
    const newCard = { title, id: response.data.id };
    return newCard;
  },
);

export const fetchRemoveCard = createAsyncThunk(
  'cards/fetchRemoveCard',
  async (id) => {
    await api.delete(routes.cardPath(id));
    return id;
  },
);

const cardsAdapter = createEntityAdapter();
const initialState = cardsAdapter.getInitialState({ loadingStatus: 'idle', error: null });

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards: cardsAdapter.addMany,
    addCard: cardsAdapter.addOne,
    removeCard: cardsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        cardsAdapter.addMany(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(fetchAddCard.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAddCard.fulfilled, (state, action) => {
        cardsAdapter.addOne(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchAddCard.rejected, (state, action) => {
        state.loadingStatus = 'loading';
        state.error = action.error;
      })
      .addCase(fetchRemoveCard.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRemoveCard.fulfilled, (state, action) => {
        cardsAdapter.removeOne(state, action);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchRemoveCard.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = cardsSlice;
export const selectors = cardsAdapter.getSelectors((state) => state.cards);
export default cardsSlice.reducer;
