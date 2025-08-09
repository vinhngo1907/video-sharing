import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import liveStreamReducer from "./features/liveStreamSlice";
import videoReducer from "./features/videoSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		liveStream: liveStreamReducer,
		video: videoReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;