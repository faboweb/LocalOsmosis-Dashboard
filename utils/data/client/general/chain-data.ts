import axios from 'axios';

import { cosmosChainData } from '@/constants/defaults';
import { urlBuilder } from '@/utils/api';
import { RawChainData, refineChainData } from '@/utils/data/client/general/types';
import { localStorage } from '@/utils/data/localStorage';

export interface ChainDataResponse {
	repository: any;
	chain: RawChainData;
}

export async function getChainData(chain: string): Promise<any> {
	try {
		const chainData = localStorage.get(chain, 'chain');
		if (chainData) return chainData;
		const url = urlBuilder.getChainData(chain);
		const res = await axios.get(url);
		const data: ChainDataResponse = res?.data;
		const ret = refineChainData(data.chain);
		if (!localStorage.set(chain, ret, 'chain')) console.warn(`failed to set localStorage for chain[${chain}]`);
		return ret;
	} catch (ex) {
		console.warn(ex);
		// TODO : proper error handling
		return { ...cosmosChainData };
	}
}

/*
{
	repository: {
		url: 'https://github.com/eco-stake/chain-registry',
		branch: 'cosmos-directory',
		commit: '11af57f2c50167d2199a485882d1b5900cb681d9',
		timestamp: 1656695635,
	},
	general: {
		$schema: '../general.schema.json',
		chain_name: 'cosmoshub',
		chain_id: 'cosmoshub-4',
		pretty_name: 'Cosmos Hub',
		status: 'live',
		network_type: 'mainnet',
		bech32_prefix: 'cosmos',
		genesis: {
			genesis_url: 'https://github.com/cosmos/mainnet/raw/master/genesis.cosmoshub-4.json.gz',
		},
		daemon_name: 'gaiad',
		node_home: '$HOME/.gaia',
		key_algos: ['secp256k1'],
		slip44: 118,
		fees: {
			fee_tokens: [
				{
					denom: 'uatom',
					fixed_min_gas_price: 0,
				},
			],
		},
		codebase: {
			git_repo: 'https://github.com/cosmos/gaia',
			recommended_version: 'v7.0.1',
			compatible_versions: ['v7.0.0', 'v7.0.1'],
			binaries: {
				'linux/amd64': 'https://github.com/cosmos/gaia/releases/download/v7.0.1/gaiad-v7.0.1-linux-amd64',
				'linux/arm64': 'https://github.com/cosmos/gaia/releases/download/v7.0.1/gaiad-v7.0.1-linux-arm64',
				'darwin/amd64': 'https://github.com/cosmos/gaia/releases/download/v7.0.1/gaiad-v7.0.1-darwin-amd64',
				'windows/amd64': 'https://github.com/cosmos/gaia/releases/download/v7.0.1/gaiad-v7.0.1-windows-amd64.exe',
			},
		},
		peers: {
			seeds: [
				{
					id: 'bf8328b66dceb4987e5cd94430af66045e59899f',
					address: 'public-seed.cosmos.vitwit.com:26656',
					provider: 'vitwit',
				},
			],
			persistent_peers: [
				{
					id: 'ee27245d88c632a556cf72cc7f3587380c09b469',
					address: '45.79.249.253:26656',
				},
			],
		},
		apis: {
			rpc: [
				{
					address: 'https://rpc-cosmoshub.blockapsis.com',
					provider: 'chainapsis',
				},
			],
			rest: [
				{
					address: 'https://lcd-cosmoshub.blockapsis.com',
					provider: 'chainapsis',
				},
			],
			grpc: [
				{
					address: 'grpc-cosmoshub.blockapsis.com:429',
					provider: 'chainapsis',
				},
			],
		},
		explorers: [
			{
				kind: 'mintscan',
				url: 'https://www.mintscan.io/cosmos',
				tx_page: 'https://www.mintscan.io/cosmos/txs/${txHash}',
			},
		],
		name: 'cosmoshub',
		path: 'cosmoshub',
		symbol: 'ATOM',
		denom: 'uatom',
		decimals: 6,
		coingecko_id: 'cosmos',
		image: 'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg',
		height: 11106330,
		best_apis: {
			rest: [
				{
					address: 'https://rest-cosmoshub.ecostake.com/',
					provider: 'ecostake',
				},
			],
			rpc: [
				{
					address: 'https://rpc-cosmoshub.ecostake.com/',
					provider: 'ecostake',
				},
			],
		},
		params: {
			authz: true,
			actual_block_time: 6.768129999637604,
			actual_blocks_per_year: 4659484.968771076,
			unbonding_time: 1814400,
			max_validators: 175,
			blocks_per_year: 4360000,
			block_time: 7.2389724770642205,
			community_tax: 0.02,
			base_inflation: 0.12035982251717305,
			estimated_apr: 0.18992804771556349,
			calculated_apr: 0.20297405584373937,
			bonded_ratio: 0.6210384628780007,
			annual_provision: '36152204348754.748477212069012244',
			bonded_tokens: '186539906495740',
			total_supply: '300367718983590',
		},
	},
};
*/
