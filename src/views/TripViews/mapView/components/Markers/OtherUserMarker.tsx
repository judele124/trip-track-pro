import GeneralMarker from './GeneralMarker';

interface IOtherUserMarkerProps {
	location: { lon: number; lat: number };
	id: string;
}

export default function OtherUserMarker({
	location,
	id,
}: IOtherUserMarkerProps) {
	return (
		<GeneralMarker
			location={location}
			id={id}
			childrenAsInnerHtmlStringClassName='flex items-center justify-center size-3 bg-red-500 rounded-full shadow-md'
			childrenAsInnerHtmlString=''
		/>
	);
}
