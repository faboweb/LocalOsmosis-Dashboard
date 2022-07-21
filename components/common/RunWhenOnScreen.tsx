import { FunctionComponent, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';

//  https://stackoverflow.com/questions/58341787/intersectionobserver-with-react-hooks
export const RunWhenOnScreen: FunctionComponent<{
	observingRef: MutableRefObject<HTMLElement | undefined>;
	extraCondition?: boolean;
	children: ReactNode;
	fallback: ReactNode;
}> = ({ extraCondition = true, fallback, children, observingRef }) => {
	const [isOnScreen, setIsOnScreen] = useState(false);
	const observerRef = useRef<IntersectionObserver>();

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting));
	}, []);

	useEffect(() => {
		if (!observerRef.current || !observingRef?.current) return;
		observerRef.current.observe(observingRef.current);

		// eslint-disable-next-line consistent-return
		return () => {
			(observerRef.current as IntersectionObserver).disconnect();
		};
	}, [observingRef]);
	return <>{isOnScreen && extraCondition ? children : fallback}</>;
};
