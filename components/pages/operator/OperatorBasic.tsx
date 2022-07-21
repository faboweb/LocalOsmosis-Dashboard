import Image from 'next/image';
import { FunctionComponent } from 'react';

import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import { Img } from '@/components/common';
import { Validator } from '@/utils/data/client/chain';
import { cleanUrl } from '@/utils/scripts';

export const OperatorBasic: FunctionComponent<{ data: Validator }> = ({ data }) => {
	return (
		<div>
			<div className="flex items-center gap-4">
				<figure className="flex items-center rounded-full border border-accent">
					<Img className="min-w-12 min-h-12 h-12 w-12 rounded-full bg-white.6" src={data.image} />
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
			<div className="mt-8">
				{data.website ? (
					<a href={data.website} target="_blank" rel="noopener noreferrer">
						<div className="hoverEff flex gap-2.5">
							<h5 className="text-white.6">{cleanUrl(data.website)}</h5>
							<Image width={24} height={24} className="h-6 w-6" src="/icons/generic/link.svg" />
						</div>
					</a>
				) : (
					<h5 className="text-white.6">Website missing</h5>
				)}
			</div>
		</div>
	);
};
