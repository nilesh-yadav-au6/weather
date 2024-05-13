import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
