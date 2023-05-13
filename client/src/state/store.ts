import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { usersApi } from './apis/users';
import { clientsApi } from './apis/clients';
import { salesStatsApi } from './apis/sales';
import { productsApi } from './apis/products';
import themeReducer from './reducers/themeSlice';
import sessionReducer from './reducers/sessionSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    session: sessionReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [salesStatsApi.reducerPath]: salesStatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      clientsApi.middleware,
      productsApi.middleware,
      salesStatsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
