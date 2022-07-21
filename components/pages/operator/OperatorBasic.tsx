import Image from 'next/image';
import { FunctionComponent, useMemo } from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import { Img } from '@/components/common';
import { useGetQuery } from '@/hooks/common/useGetQuery';
import { useAppSelector } from '@/hooks/store';
import { switchAddressPrefix } from '@/utils/blockchain';
import { Validator } from '@/utils/data/client/chain';
import { cleanUrl } from '@/utils/scripts';

export const OperatorBasic: FunctionComponent<{ data: Validator }> = ({ data }) => {
	const chain = useGetQuery('chain');
	const prefix = useAppSelector(state => state.chainData.data[chain]?.bech32Prefix);
	const chainAddress = useMemo(() => {
		if (!prefix) return '-';
		return switchAddressPrefix(data.address, prefix);
	}, [prefix]);
	return (
		<div>
			<div className="flex items-center gap-4">
				<figure className="flex items-center rounded-full border border-accent">
					{data.image && <Img className="min-w-12 min-h-12 h-12 w-12 rounded-full bg-white.6" src={data.image} />}
					{!data.image && (
						<figure className="min-w-12 min-h-12 flex-center h-12 w-12 rounded-full bg-white.6">
							<Img className="min-w-10 min-h-10 h-10 w-10" src="/icons/generic/missing-token.svg" />
						</figure>
					)}
				</figure>
				<h3>[{data.moniker}]</h3>
			</div>
			<div className="mt-8 flex gap-2.5">
				<h5 className="text-white.6">{data.address}</h5>
				<CopyToClipboard
					text={data.address}
					onCopy={() => {
						toast('Copied to clipboard');
					}}>
					<button type="button" className="hoverEff">
						<Image width={24} height={24} className="h-6 w-6" src="/icons/generic/clipboard.svg" />
					</button>
				</CopyToClipboard>
			</div>
			<div className="mt-1 flex gap-2.5">
				<p className="text-[14px] tracking-[-0.5px] text-white.6">{chainAddress}</p>
				<CopyToClipboard
					text={chainAddress}
					onCopy={() => {
						toast('Copied to clipboard');
					}}>
					<button type="button" className="hoverEff flex-center">
						<Image width={16} height={16} className="h-4 w-4" src="/icons/generic/clipboard.svg" />
					</button>
				</CopyToClipboard>
			</div>
			<div className="mt-8">
				{data.website ? (
					<a className="hoverEff flex w-fit gap-2.5" href={data.website} target="_blank" rel="noopener noreferrer">
						<h5 className="text-white.6">{cleanUrl(data.website)}</h5>
						<Image width={24} height={24} className="h-6 w-6" src="/icons/generic/link.svg" />
					</a>
				) : (
					<h5 className="text-white.6">Website missing</h5>
				)}
			</div>
		</div>
	);
};
