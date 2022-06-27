/* eslint-disable import/no-named-as-default */ // disabled because intended by redux conventions
import { configureStore } from '@reduxjs/toolkit';

import chainDataSlice from '@/store/features/chain/chainDataSlice';
import counterSlice from '@/store/features/example/counterSlice';

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		chainData: chainDataSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
