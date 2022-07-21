import Image from 'next/image';
import { FunctionComponent } from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import { Img } from '@/components/common';
import { OperatorProps } from '@/components/pages/operator/types';
import { useSwitchAddressPrefix } from '@/hooks/blockchain';
import { cleanUrl, truncateMiddle } from '@/utils/scripts';

export const OperatorBasic: FunctionComponent<OperatorProps> = ({ data, chain }) => {
	const chainAddress = useSwitchAddressPrefix(data.address, chain) ?? '-';
	return (
		<div>
			<div className="flex items-center gap-4">
				<figure className="flex items-center rounded-full border border-accent">
					{data.image && (
						<Img
							className="min-w-8 min-h-8 md:min-w-12 md:min-h-12 h-8 w-8 rounded-full bg-white.6 md:h-12 md:w-12"
							src={data.image}
						/>
					)}
					{!data.image && (
						<figure className="min-w-8 min-h-8 md:min-w-12 md:min-h-12 flex-center h-8 w-8 rounded-full bg-white.6 md:h-12 md:w-12">
							<Img
								className="min-w-6 min-h-6 md:min-w-10 md:min-h-10 h-6 w-6 md:h-10 md:w-10"
								src="/icons/generic/missing-token.svg"
							/>
						</figure>
					)}
				</figure>
				<h3 className="truncate truncate text-[24px] leading-[36px] md:text-[48px] md:leading-[56px]">
					[{data.moniker}]
				</h3>
			</div>
			<div className="mt-8 flex gap-2.5">
				<h5 className="hidden text-white.6 md:block">{data.address}</h5>
				<h5 className="block text-white.6 md:hidden">{truncateMiddle(data.address, 8, 8)}</h5>
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
				<p className="hidden text-[14px] tracking-[-0.5px] text-white.6 md:block">{chainAddress}</p>
				<p className="block text-[14px] tracking-[-0.5px] text-white.6 md:hidden">
					{truncateMiddle(chainAddress, 8, 8)}
				</p>
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
						<h5 className="hidden text-white.6 md:block">{cleanUrl(data.website)}</h5>
						<h6 className="block text-white.6 md:hidden">{cleanUrl(data.website)}</h6>
						<div className="flex-center">
							<Img className="h-5 w-5 md:h-6 md:w-6" src="/icons/generic/link.svg" />
						</div>
					</a>
				) : (
					<h5 className="text-white.6">Website missing</h5>
				)}
			</div>
		</div>
	);
};
