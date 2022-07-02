import { FunctionComponent } from 'react';

import cn from 'clsx';

import { useAppSelector } from '@/hooks/store';
import { selectChainAssets } from '@/store/features/chain/chainDataSlice';
import { ChainStatus } from '@/utils/data/server';

import { Img } from './Img';

export const ChainStatusDisplay: FunctionComponent<{ chainStatus: ChainStatus }> = ({ chainStatus }) => {
	const chainAsset = useAppSelector(state => selectChainAssets(state, chainStatus.name));
	const primaryAsset = chainAsset?.assets?.[0];
	return (
		<div className="relative w-12">
			{!chainStatus.available && (
				<div className="absolute flex h-full w-full items-center justify-center">
					<p className="mb-2 text-xs leading-none">❌</p>
				</div>
			)}
			<div
				className={cn('w-full h-full flex flex-col items-center justify-between', {
					'opacity-25': !chainStatus.available,
				})}>
				<figure className={cn('w-9 h-9 rounded-full flex items-center justify-center bg-gray-200')}>
					<Img
						src={primaryAsset?.logo || '/icons/generic/not-found.svg'}
						className={cn({ invert: !primaryAsset?.logo }, 'w-8 h-8 rounded-full')}
					/>
				</figure>
				<p className="mt-1 w-full overflow-hidden truncate text-center text-sm leading-none text-gray-100">
					<span className={cn('text-[10px] tracking-wide')}>{primaryAsset?.symbol || '??'}</span>
				</p>
			</div>
		</div>
	);
};
