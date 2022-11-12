import { configureStore } from "@reduxjs/toolkit";
import mostSharedReducer from "../feature/mostSharedSlice";
import mostViewedReducer from "../feature/mostViewedSlice";
import mostEmailedReducer from "../feature/mostEmailedSlice";


export const store = configureStore({
  reducer: {
    mostShared: mostSharedReducer,
    mostViewed: mostViewedReducer,
    mostEmailed: mostEmailedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
