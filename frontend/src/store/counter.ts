import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { useDispatch } from '@hooks/useDispatch';
import { useSelector } from '@hooks/useSelector';
import { createAsyncState } from './utils';

const api = {
  fetchCounterRequest: () =>
    new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    }),
  setCounterRequest: (newValue: number) =>
    new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(newValue);
      }, 500);
    }),
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: createAsyncState<number | null>(null),
  reducers: {
    fetchCounterRequest: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    fetchCounterSuccess: (state, action: PayloadAction<number>) => {
      state.status = 'success';
      state.data = action.payload;
      state.error = null;
    },
    fetchCounterFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
    setCounterRequest: (state, _action: PayloadAction<number>) => {
      state.status = 'loading';
      state.error = null;
    },
    setCounterSuccess: (state, action: PayloadAction<number>) => {
      state.status = 'success';
      state.data = action.payload;
      state.error = null;
    },
    setCounterFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failure';
      state.error = action.payload;
    },
  },
});

const { actions } = counterSlice;

function* fetchCounterSagaWorker() {
  try {
    const response: number = yield api.fetchCounterRequest();
    yield put(actions.fetchCounterSuccess(response));
  } catch (ex) {
    yield put(actions.fetchCounterFailure(ex.message));
  }
}

function* setCounterSagaWorker({ payload }: PayloadAction<number>) {
  try {
    const response: number = yield api.setCounterRequest(payload);
    yield put(actions.setCounterSuccess(response));
  } catch (ex) {
    yield put(actions.setCounterFailure(ex.message));
  }
}

export function* counterSagaWatcher() {
  yield takeEvery(actions.fetchCounterRequest.type, fetchCounterSagaWorker);
  yield takeEvery(actions.setCounterRequest.type, setCounterSagaWorker);
}

export const useCounterActions = () => {
  const dispatch = useDispatch();

  return {
    fetchCounter: () => dispatch(actions.fetchCounterRequest()),
    setCounter: (payload: number) => dispatch(actions.setCounterRequest(payload)),
  };
};

export const useCounterState = () => useSelector((state) => state.counter);

export default counterSlice.reducer;
