import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import liveStreamReducer from "./features/liveStreamSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    liveStream: liveStreamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;