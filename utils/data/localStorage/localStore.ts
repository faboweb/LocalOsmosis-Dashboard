import store2 from 'store2';

import { CONSTS } from '@/constants/client';

type StoreNamespace = 'chain-assets' | 'chain-data' | 'validators-data' | 'global';

// returns boolean for one line error handling
// ex) if(!localStorage.set('test', 'test')) throw new Error('didn't work')

function storeNamespace(namespace: StoreNamespace) {
	return store2.namespace(`${namespace}-${CONSTS.LOCAL_STORAGE_VERSION}`);
}

export const localStorage = {
	get: (key: string, namespace: StoreNamespace = 'global') => {
		const store = storeNamespace(namespace);
		return store.get(key);
	},
	set: (key: string, value: any, namespace: StoreNamespace = 'global'): boolean => {
		try {
			const store = storeNamespace(namespace);
			store.set(key, value);
			return true;
		} catch (ex) {
			console.warn(ex);
			return false;
		}
	},
	bulkSet: (data: { [key: string]: any }, namespace: StoreNamespace = 'global'): boolean => {
		try {
			const store = storeNamespace(namespace);
			store.setAll(data);
			return true;
		} catch (ex) {
			console.warn(ex);
			return false;
		}
	},
	getAll: (namespace: StoreNamespace = 'global') => {
		const store = storeNamespace(namespace);
		return store.getAll();
	},
	checkVersion: () => {
		if (store2.get('version') !== CONSTS.LOCAL_STORAGE_VERSION) {
			store2.clearAll();
			store2.set('version', CONSTS.LOCAL_STORAGE_VERSION);
		}
	},
};

export const initLocalStorage = () => {
	localStorage.checkVersion();
};
