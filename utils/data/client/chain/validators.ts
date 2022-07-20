import axios from 'axios';

import { urlBuilder } from '@/utils/chains';
import { RawValidator, refineRawValidator, Validator } from '@/utils/data/client/chain/types';
import { localStorage } from '@/utils/data/localStorage';

interface ValidatorsResponse {
	name: string;
	valdiators: RawValidator[];
}

export async function getValidatorsData(chain: string): Promise<Validator[]> {
	try {
		const validatorsData = localStorage.get(chain, 'validators-data');
		if (validatorsData) return validatorsData;
		const url = urlBuilder.getValidators(chain);
		const res = await axios.get(url);
		const data: ValidatorsResponse = res?.data;
		return data.valdiators.map((validator: RawValidator) => refineRawValidator(validator));
	} catch (e) {
		console.warn(e);
		return [];
	}
}
