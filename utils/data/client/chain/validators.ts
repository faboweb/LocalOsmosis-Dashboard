import axios from 'axios';

import { urlBuilder } from '@/utils/chains';
import { RawValidator, refineRawValidator, Validator } from '@/utils/data/client/chain/types';

interface ValidatorsResponse {
	name: string;
	validators: RawValidator[];
}

export async function getValidatorsData(chain: string): Promise<Validator[]> {
	try {
		const url = urlBuilder.getValidators(chain);
		const res = await axios.get(url);
		const respData: ValidatorsResponse = res?.data;
		console.log('raw validators', respData);
		return respData.validators
			.map((validator: RawValidator) => refineRawValidator(validator))
			.sort((a, b) => Number(b.tokens) - Number(a.tokens));
	} catch (e) {
		console.warn(e);
		return [];
	}
}
