import { Tab } from '@headlessui/react';
import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from 'react';

import copy from 'copy-to-clipboard';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import startCase from 'lodash/startCase';
import { toast } from 'react-toastify';

import { useStore } from '@/hooks/common/useStore';
import { truncateMiddle } from '@/utils/scripts';

export const Events: FunctionComponent = () => {
	const {
		state: { events },
	} = useStore();
	const eventKeys = Object.keys(events);
	const [selectedIndex, setSelectedIndex] = useState(0);
	return (
		<div className="flex flex-col gap-3 h-full w-full max-h-[60vh]">
			<p className="text-center">Events</p>
			<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				{eventKeys.length > 0 && (
					<>
						<EventTabs eventKeys={eventKeys} />
						<EventPanel event={eventKeys[selectedIndex]} data={events?.[eventKeys[selectedIndex]]} />
					</>
				)}
			</Tab.Group>
		</div>
	);
};

const EventTabs: FunctionComponent<{ eventKeys: string[] }> = ({ eventKeys }) => {
	return (
		<Tab.List as="ul" className="w-full flex items-center flex-wrap gap-2">
			{eventKeys.map(value => (
				<Tab className={({ selected }) => (selected ? 'border-accent text-accent' : '')} as="li" key={value}>
					<button
						type="button"
						className="px-2 py-1 border border-inherit rounded-lg hover:border-accent group cursor-pointer">
						<p className="text-[12px] group-hover:text-accent">{startCase(value)}</p>
					</button>
				</Tab>
			))}
		</Tab.List>
	);
};

const EventPanel: FunctionComponent<{ event: string; data: any[] }> = ({ event, data }) => {
	const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
	useEffect(() => {
		if (!ref.current) return;
		ref.current.scrollIntoView({ behavior: 'smooth' });
	}, [data.length]);
	return (
		<ul
			onClick={() => {
				toast('Copied to clipboard', { autoClose: 250 });
				copy(JSON.stringify(data));
			}}
			className="overflow-y-auto flex flex-col-reverse">
			{data.map((value, index) => (
				<Item key={index} data={value} />
			))}
			<li className="w-full h-0" ref={ref} />
		</ul>
	);
};

const Item: FunctionComponent<{ data: any }> = ({ data }) => {
	const dataKeys = Object.keys(data).filter(value => value !== 'height');
	return (
		<li className="flex items-start gap-2 border-b border-enabledGold border-opacity-20 py-1">
			<p className="text-[14px] leading-tight min-w-[15vw]">{data.height}</p>
			<ul className="flex flex-col items-start min-w-[15vw]">
				{dataKeys.map(dataKey => (
					<JoinedItem key={dataKey} data={data} dataKey={dataKey} />
				))}
			</ul>
		</li>
	);
};

const JoinedItem: FunctionComponent<{ data: any; dataKey: string }> = ({ data, dataKey }) => {
	let joined = '';
	if (isArray(data[dataKey])) {
		if (dataKey === 'address' || dataKey === 'validator') {
			joined = data[dataKey].map((value: string) => truncateMiddle(value, 6, 6)).join(', ');
		} else {
			joined = filter(data[dataKey], v => !!v).join(',');
			joined = joined.length > 20 ? truncateMiddle(joined, 6, 6) : joined;
		}
	} else {
		joined = data[dataKey].length > 20 ? truncateMiddle(data[dataKey], 6, 6) : data[dataKey];
	}
	return (
		<>
			{joined.length > 0 ? (
				<li key={dataKey} className="flex items-center gap-2">
					<p className="text-[14px] leading-tight min-w-[15vw]">{dataKey}</p>
					<p className="text-[14px] leading-tight min-w-[15vw]">{joined}</p>
				</li>
			) : (
				''
			)}
		</>
	);
};
