import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/index';
import { ChainAssets } from '@/utils/data/client';
import { ChainStatus } from '@/utils/data/server';

// Define a type for the slice state
interface ChainDataState {
	status: ChainStatus[];
	data: Record<string, ChainAssets>;
}

//	cosmoshub is deemed to be always available
const initialState: ChainDataState = {
	status: [],
	data: {},
} as ChainDataState;

export const chainDataSlice = createSlice({
	name: 'chainData',
	initialState,
	reducers: {
		setChainStatus: (state, action: PayloadAction<ChainStatus[]>) => {
			state.status = action.payload;
		},
		setBulkChainData: (state, action: PayloadAction<ChainAssets[]>) => {
			action.payload.forEach(chainData => {
				state.data[chainData.chainName] = chainData;
			});
		},
	},
});

export const { setChainStatus, setBulkChainData } = chainDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChainStatuses = (state: RootState) => state.chainData.status;
export const selectAvailableChains = (state: RootState) => state.chainData.status.filter(chain => chain.available);
export const selectChainData = (state: RootState, chainName: string) => state.chainData.data[chainName];

export default chainDataSlice.reducer;
