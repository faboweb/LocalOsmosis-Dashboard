import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/index';
import { Tx, Validator } from '@/utils/data/client/chain';
import { ChainStatus } from '@/utils/data/client/general';

interface ValidatorDataSlice {
	validatorData: Record<string, Validator[]>;
	addressTxs: Record<string, Record<string, Tx[]>>;
}

const initialState: ValidatorDataSlice = {
	validatorData: {},
	addressTxs: {},
};

export const validatorDataSlice = createSlice({
	name: 'validatorData',
	initialState,
	reducers: {
		initAddressTxs: (state, action: PayloadAction<ChainStatus[]>) => {
			const chains = action.payload;
			chains.forEach(chain => {
				state.addressTxs[chain.name] = {};
			});
		},
		setValidatorData: (state, action: PayloadAction<{ chain: string; validators: Validator[] }>) => {
			state.validatorData[action.payload.chain] = action.payload.validators;
		},
		setValidatorTxs: (state, action: PayloadAction<{ chain: string; address: string; txs: Tx[] }>) => {
			if (state.addressTxs[action.payload.chain] === undefined)
				throw new Error(`initAddressTxs was not run or chain[${action.payload.chain}] is not available`);
			state.addressTxs[action.payload.chain][action.payload.address] = action.payload.txs;
		},
	},
});

export const { setValidatorData, initAddressTxs, setValidatorTxs } = validatorDataSlice.actions;

export const selectValidatorData = (state: RootState, chainName: string) =>
	state.validatorData.validatorData[chainName];

export const selectAddressTxs = (state: RootState, chainName: string, address: string) =>
	state.validatorData.addressTxs[chainName]?.[address];

export default validatorDataSlice.reducer;
