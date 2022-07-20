import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/index';
import { Validator } from '@/utils/data/client/chain';

interface ValidatorDataSlice {
	validatorData: Record<string, Validator[]>;
}

const initialState: ValidatorDataSlice = {
	validatorData: {},
};

export const validatorDataSlice = createSlice({
	name: 'validatorData',
	initialState,
	reducers: {
		setValidatorData: (state, action: PayloadAction<{ chain: string; validators: Validator[] }>) => {
			state.validatorData[action.payload.chain] = action.payload.validators;
		},
	},
});

export const { setValidatorData } = validatorDataSlice.actions;

export const selectValidatorData = (state: RootState, chainName: string) =>
	state.validatorData.validatorData[chainName];

export default validatorDataSlice.reducer;
