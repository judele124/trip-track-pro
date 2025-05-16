import Icon from '@/components/icons/Icon';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import { Trip } from '@/types/trip';
import { useRef } from 'react';
import useTripOption, {
	actions,
	checkIsValidAction,
} from '../hooks/useTripOption';
import { useAuthContext } from '@/contexts/AuthContext';

interface ITripRowOptions {
	trip: Trip;
	isCreator: boolean;
}

export default function TripRowOptions({ trip, isCreator }: ITripRowOptions) {
	const { isOpen, setIsOpen } = useToggle();
	const dotsRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<button
				ref={dotsRef}
				className='m-0 -mx-2 p-0 transition-all hover:scale-110'
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(true);
				}}
			>
				<Icon name='threeDots' />
			</button>

			{isOpen && (
				<ActionsModal
					trip={trip}
					isCreator={isCreator}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					dotsRef={dotsRef}
				/>
			)}
		</>
	);
}

function ActionsModal({
	trip,
	isCreator,
	isOpen,
	setIsOpen,
	dotsRef,
}: {
	trip: Trip;
	isCreator: boolean;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	dotsRef: React.RefObject<HTMLButtonElement>;
}) {
	const { user } = useAuthContext();
	const { handleActions } = useTripOption({
		tripId: trip._id,
	});

	const isAlreadyParticipant = trip.participants.some(({ userId }) => {
		return userId._id === user?._id;
	});

	return (
		<Modal
			anchorTo='right'
			anchorElement={dotsRef}
			backgroundClassname='bg-transparent backdrop-blur-none'
			onBackdropClick={() => setIsOpen(false)}
			open={isOpen}
		>
			<div className='flex w-56 flex-col gap-2 rounded-2xl border-2 border-primary bg-light p-4'>
				{actions
					.filter(({ name }) =>
						checkIsValidAction({
							actionName: name,
							currentStatus: trip.status,
							isCreator,
							isAlreadyParticipant,
						})
					)
					.map(({ name, styles, label }) => {
						return (
							<Button
								key={name}
								{...styles}
								onClick={() => handleActions(name)}
							>
								{label}
							</Button>
						);
					})}
			</div>
		</Modal>
	);
}
