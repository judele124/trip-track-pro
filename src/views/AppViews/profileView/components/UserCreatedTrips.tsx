import { Trip } from '@/types/trip';
import TripRow from './TripRow';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import useAxios from '@/hooks/useAxios';
import { API_BASE_URL } from '@/env.config';
import { getErrorMessage } from '@/utils/errorMessages';

export default function UserCreatedTrips() {
	const { isOpen, setIsOpen } = useToggle(false);
	const { data, loading, error, status } = useAxios({
		url: `${API_BASE_URL}/trip/getAll`,
	});

	return (
		<>
			<h3 className='py-3'>My trips</h3>
			<div className='no-scrollbar flex h-full w-full flex-col gap-2 overflow-y-auto'>
				{status && error && (
					<p className='text-red-500'>{getErrorMessage(status)}</p>
				)}
				{loading && <p>loading trips</p>}
				{!loading &&
					(data.length > 0 ? (
						data.map((tripItem: Trip, index: number) => (
							<TripRow
								key={tripItem._id}
								trip={tripItem}
								setIsOpen={setIsOpen}
								i={index}
							/>
						))
					) : (
						<p className='text-center'>No trips created yet</p>
					))}
			</div>
			<Modal
				center
				backgroundClassname='bg-transparent'
				onBackdropClick={() => setIsOpen(false)}
				open={isOpen}
			>
				<div className='flex w-48 flex-col rounded-2xl border-2 border-primary bg-light p-4'>
					<Button primary>Start trip</Button>
					<Button className='underline'>Delete</Button>
				</div>
			</Modal>
		</>
	);
}
