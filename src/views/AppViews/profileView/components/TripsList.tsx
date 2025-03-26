import { Trip } from '@/types/trip';
import TripRow from './TripRow';
import { getErrorMessage } from '@/utils/errorMessages';
import Button from '@/components/ui/Button';
import useToggle from '@/hooks/useToggle';
import Modal from '@/components/ui/Modal';

interface ITripListProps {
	data: Trip[];
	status: number | undefined;
	loading: boolean;
	hasError: boolean;
}

export default function TripsList({
	data,
	hasError,
	loading,
	status,
}: ITripListProps) {
	const { isOpen, setIsOpen } = useToggle();
	return (
		<>
			{status && hasError && (
				<p className='text-red-500'>{getErrorMessage(status)}</p>
			)}
			{loading && <p>loading trips</p>}
			{data?.length > 0 ? (
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
			)}
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
