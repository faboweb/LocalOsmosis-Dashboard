import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import isString from 'lodash/isString';

export function cleanUrl(url: string): string {
	return url.replace(/^https?:\/\//, '');
}

export function formatNum(str: string | number): string {
	const n = `${str}`;
	const p = n.indexOf('.');
	return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => (p < 0 || i < p ? `${m},` : m));
}

export const truncateMiddle = (str: string, left: number, right: number): string => {
	if (!isString(str)) return 'Not a string';
	if (str.length <= left + right) return str;
	return `${str.slice(0, left)}...${str.slice(str.length - right, str.length)}`;
};
TimeAgo.addDefaultLocale(en);
export const timeAgo = new TimeAgo('en-US');

// based on 5
export const getPaginationArray = (total: number, current: number): number[] => {
	if (total < 5 || current < 3) return Array.from({ length: total }, (_, i) => i + 1);
	if (current > total - 2) return Array.from({ length: 5 }, (_, i) => i + 1);
	return Array.from({ length: 5 }, (_, i) => total - 5 + i);
};
