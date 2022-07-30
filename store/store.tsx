import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import { Context } from './types';

const initContext = (): Context => ({
	txs: [],
	nodeConfig: {},
	consensus: [],
	proposals: [],
	events: {},
	blocks: [],
	contracts: [],
});

export const StoreContext = createContext<AppContext>(null!);

type AppContext = {
	state: Context;
	pushTx: (tx: any) => void;
	setNodeConfig: (nodeConfig: any) => void;
	pushConsensus: (consensus: any) => void;
	pushProposals: (proposals: any) => void;
	pushEvent: (events: any) => void;
	pushBlocks: (blocks: any) => void;
	pushContracts: (contracts: any) => void;
};

export const StoreProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	const [state, setState] = useState(initContext());
	const value = {
		state,
		pushTx: (tx: any) => setState(prev => ({ ...prev, txs: [...prev.txs, tx] })),
		setNodeConfig: (nodeConfig: any) => setState(prev => ({ ...prev, nodeConfig })),
		pushConsensus: (consensus: any) => setState(prev => ({ ...prev, consensus: [...prev.consensus, consensus] })),
		pushProposals: (proposals: any) => setState(prev => ({ ...prev, proposals: [...prev.proposals, ...proposals] })),
		pushEvent: (event: any) =>
			setState(prev => {
				const { events } = prev;
				events[event.type] = [...events[event.type], event];
				return { ...prev, events };
			}),
		pushBlocks: (blocks: any) => setState(prev => ({ ...prev, blocks })),
		pushContracts: (contracts: any) => setState(prev => ({ ...prev, contracts: [...contracts] })),
	};
	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
