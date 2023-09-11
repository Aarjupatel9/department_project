import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userDetailSlice from './reducers/userDetailSlice';
import systemVariableSlice from "./reducers/systemVariables"
import  EventsSlice  from './reducers/eventsSlice';
export const store = configureStore({
  reducer: {
    userDetail: userDetailSlice,
    systemVariables: systemVariableSlice,
    Events: EventsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
