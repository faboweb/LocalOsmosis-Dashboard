export function runOnDocumentStateChange(cb: (res: boolean) => void) {
	const documentStateChange = (event: Event) => {
		if (event.target && (event.target as Document).readyState === 'complete') {
			cb(true);
			document.removeEventListener('readystatechange', documentStateChange);
		}
		cb(false);
	};
	document.addEventListener('readystatechange', documentStateChange);
}
