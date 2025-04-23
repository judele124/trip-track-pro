import GeneralMarker from './GeneralMarker';

interface IOtherUserMarkerProps {
	location: { lon: number; lat: number };
}

export default function OtherUserMarker({ location }: IOtherUserMarkerProps) {
	return (
		<GeneralMarker
			location={location}
			childrenAsInnerHtmlStringClassName='flex items-center justify-center size-3 bg-red-500 rounded-full shadow-md'
			childrenAsInnerHtmlString=''
		/>
	);
}
