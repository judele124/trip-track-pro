import Map from './Map';
import UserTripLogic from './components/UserTripLogic';

export default function MapView() {
	return (
		<div className='page-colors mx-auto h-full'>
			<Map>
				<UserTripLogic />
			</Map>
		</div>
	);
}
