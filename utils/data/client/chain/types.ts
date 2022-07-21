import Big from 'big.js';

export interface RawValidator {
	moniker: string;
	identity: string;
	address: string;
	hexAddress: string;
	uptime: number;
	missedBlocks: number;
	operator_address: string;
	consensus_pubkey: {
		'@type': string;
		key: string;
	};
	jailed: boolean;
	status: string;
	tokens: string;
	delegator_shares: string;
	description: {
		moniker: string;
		identity: string;
		website: string;
		security_contact: string;
		details: string;
	};
	unbonding_height: string;
	unbonding_time: string;
	commission: {
		commission_rates: {
			rate: string;
			max_rate: string;
			max_change_rate: string;
		};
		update_time: string;
	};
	min_self_delegation: string;
	rank: number;
	mintscan_image: string;
	keybase_image: string;
}

export interface Validator {
	moniker: string;
	address: string;
	uptime: number;
	missedBlocks: number;
	status: string;
	jailed: boolean;
	tokens: string;
	website: string;
	details: string;
	image: string;
}

export const refineRawValidator = (rawValidator: RawValidator): Validator => {
	const {
		moniker,
		address,
		uptime,
		missedBlocks,
		status,
		jailed,
		tokens,
		description,
		mintscan_image: image,
	} = rawValidator;
	return {
		moniker,
		address,
		uptime: new Big(uptime).mul(100).prec(3).toNumber(),
		missedBlocks,
		status,
		jailed,
		tokens,
		website: description.website,
		details: description.details,
		image,
	};
};
