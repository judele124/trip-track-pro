import { ReactElement, useEffect, useRef } from 'react';
import useMarker from '../../hooks/useMarker';
import { useMap } from '../../Map';

interface ICommonGeneralMarkerProps {
	location: { lat: number; lon: number };
	toCenter?: boolean;
}

type IGeneralMarkerProps = ICommonGeneralMarkerProps &
	(
		| {
				children: ReactElement;
				childrenAsInnerHtmlString?: never;
				childrenAsInnerHtmlStringClassName?: never;
		  }
		| {
				children?: never;
				childrenAsInnerHtmlString: string;
				childrenAsInnerHtmlStringClassName?: string;
		  }
	);

export default function GeneralMarker({
	location,
	children,
	toCenter,
	childrenAsInnerHtmlString = '',
	childrenAsInnerHtmlStringClassName = '',
}: IGeneralMarkerProps) {
	const { isMapReady, mapRef } = useMap();
	const ref = useRef<HTMLElement | null>(null);

	useMarker({
		ref,
		location,
		isMapReady,
		mapRef,
		toCenter,
	});

	useEffect(() => {
		if (!children) {
			const htmlElement = document.createElement('div');
			htmlElement.innerHTML = childrenAsInnerHtmlString;
			htmlElement.className = childrenAsInnerHtmlStringClassName;
			ref.current = htmlElement;
		}
	}, [children, childrenAsInnerHtmlString, childrenAsInnerHtmlStringClassName]);

	return children ? (
		<div ref={(node) => node && (ref.current = node)}>{children}</div>
	) : null;
}
