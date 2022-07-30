import { useContext } from 'react';

import { StoreContext } from '@/store/store';

export const useStore = () => useContext(StoreContext);
