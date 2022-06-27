import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/index';

import { ChainStatus } from '@/utils/data/server';

// Define a type for the slice state
interface ChainDataState {
	status: ChainStatus[];
}

//	cosmoshub is deemed to be always available
const initialState: ChainDataState = {
	status: [{ name: 'cosmoshub', available: true }],
} as ChainDataState;

export const chainDataSlice = createSlice({
	name: 'chainData',
	initialState,
	reducers: {
		setChainStatus: (state, action: PayloadAction<ChainStatus[]>) => {
			state.status = action.payload;
		},
	},
});

export const { setChainStatus } = chainDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChainStatuses = (state: RootState) => state.chainData.status;
export const selectAvailableChains = (state: RootState) => state.chainData.status.filter(chain => chain.available);

export default chainDataSlice.reducer;
