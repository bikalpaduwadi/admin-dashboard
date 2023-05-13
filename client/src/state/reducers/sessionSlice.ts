import { createSlice } from '@reduxjs/toolkit';

export interface SessionState {
  userId: string;
}

const initialState: SessionState = {
  userId: '63701cc1f03239b7f700000e',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
});

export default sessionSlice.reducer;
