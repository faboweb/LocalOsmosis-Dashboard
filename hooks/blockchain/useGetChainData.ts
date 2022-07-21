import { useAppSelector } from '@/hooks/store';
import { selectChainAssets, selectChainData } from '@/store/features/chain/chainDataSlice';

export const useGetChainData = (chain: string) => {
	const { chainData, chainAssets } = useAppSelector(state => ({
		chainData: selectChainData(state, chain),
		chainAssets: selectChainAssets(state, chain),
	}));
	return { chainData, chainAssets };
};

export const useGetChainDisplay = (chain: string) => {
	const { chainData, chainAssets } = useAppSelector(state => ({
		chainData: selectChainData(state, chain),
		chainAssets: selectChainAssets(state, chain),
	}));
	return {
		// eslint-disable-next-line no-template-curly-in-string
		getTxPage: (hash: string) => chainData.explorers[0].txPage.replace('${txHash}', hash),
		decimals: chainData.decimals,
		denom: chainAssets.assets[0].symbol,
	};
};
