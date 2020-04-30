import { ThunkAction, Action } from '@reduxjs/toolkit';

export type ReduxStore = typeof import('@store/store').store;

export type RootState = ReturnType<typeof import('@store/rootReducer').rootReducer>;

export type AppDispatch = ReduxStore['dispatch'];

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
