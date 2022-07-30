export const refineTxData = (tx: any) => {
	const resp = tx.response;
	return {
		height: resp.data.value.TxResult?.height,
		hash: resp.events['tx.hash'][0],
		raw: tx,
	};
};
