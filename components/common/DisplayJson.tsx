import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export const DisplayJson = ({ data }) => {
	return <ReactJson theme="monokai" src={data} collapseStringsAfterLength={20} enableClipboard />;
};
