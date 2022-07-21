export function cleanUrl(url: string): string {
	return url.replace(/^https?:\/\//, '');
}

export function formatNum(str: string | number): string {
	const n = `${str}`;
	const p = n.indexOf('.');
	return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => (p < 0 || i < p ? `${m},` : m));
}
