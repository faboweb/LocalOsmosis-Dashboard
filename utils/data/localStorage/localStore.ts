import store2 from 'store2';

type StoreNamespace = 'chain' | 'global';

// returns boolean for one line error handling
// ex) if(!localStorage.set('test', 'test')) throw new Error('didn't work')
export const localStorage = {
	get: (key: string, namespace: StoreNamespace = 'global') => {
		const store = store2.namespace(namespace);
		return store.get(key);
	},
	set: (key: string, value: any, namespace: StoreNamespace = 'global'): boolean => {
		try {
			const store = store2.namespace(namespace);
			store.set(key, value);
			return true;
		} catch (ex) {
			console.warn(ex);
			return false;
		}
	},
	bulkSet: (data: { [key: string]: any }, namespace: StoreNamespace = 'global'): boolean => {
		try {
			const store = store2.namespace(namespace);
			store.setAll(data);
			return true;
		} catch (ex) {
			console.warn(ex);
			return false;
		}
	},
	getAll: (namespace: StoreNamespace = 'global') => {
		const store = store2.namespace(namespace);
		return store.getAll();
	},
};
