import dynamic from 'next/dynamic';
import { FunctionComponent } from 'react';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export const DisplayJson: FunctionComponent<{ data: any; collapseStringsAfterLength?: number }> = ({
	data,
	collapseStringsAfterLength = 20,
}) => {
	return (
		<ReactJson theme="monokai" src={data} collapseStringsAfterLength={collapseStringsAfterLength} enableClipboard />
	);
};
