import dynamic from 'next/dynamic';
import { FunctionComponent } from 'react';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export const DisplayJson: FunctionComponent<{ data: any }> = ({ data }) => {
	return <ReactJson theme="monokai" src={data} collapseStringsAfterLength={20} enableClipboard />;
};
