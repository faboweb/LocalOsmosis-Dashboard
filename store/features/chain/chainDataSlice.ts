import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/index';

// Define a type for the slice state
interface ChainDataState {
	value: number;
}

// Define the initial state using that type
const initialState: ChainDataState = {
	value: 0,
} as ChainDataState;

export const chainDataSlice = createSlice({
	name: 'chainData',
	initialState,
	reducers: {
		increment: state => {
			state.value += 1;
		},
		decrement: state => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = chainDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChain = (state: RootState) => state.counter.value;

export default chainDataSlice.reducer;
