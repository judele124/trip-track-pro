import { useFormContext } from 'react-hook-form';
import Button from '@/components/ui/Button';
import InputFeildError from '@/components/ui/InputFeildError';
import { useRef, useState } from 'react';
import StopInput from './StopInput';
import { Types } from 'trip-track-package';

export default function CTFormStage2() {
	const {
		formState: { errors },
	} = useFormContext<Types['Trip']['Model']>();
	const [middleStopsCount, setMiddleStopsCount] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div ref={containerRef}>
				{errors.stops && (
					<InputFeildError
						message={
							'Trip must have at least 2 stop, all stops must have an address'
						}
					/>
				)}
				<p className={`mb-1 pl-5 text-start font-semibold`}>First Stop</p>
				<StopInput index={0} />
			</div>
			<div>
				{middleStopsCount > 0 && (
					<p className={`mb-1 pl-5 text-start font-semibold`}>Middle Stops</p>
				)}
				<div
					className={`flex max-h-[40vh] flex-col gap-2 ${middleStopsCount > 3 && 'overflow-y-scroll'}`}
				>
					{[...Array(middleStopsCount)].map((_, i) => (
						<StopInput
							onRemove={() => setMiddleStopsCount((prev) => prev - 1)}
							isMiddleStop
							index={i + 1}
							key={i + 1}
						/>
					))}
				</div>
			</div>
			<Button
				onClick={() => setMiddleStopsCount((prev) => prev + 1)}
				type='button'
				className='font-normal'
			>
				Add middle stop
			</Button>
			<div>
				<p className={`mb-1 pl-5 text-start font-semibold`}>Last Stop</p>
				<StopInput index={middleStopsCount + 1} />
			</div>
			<Button type='submit' primary>
				Create Trip
			</Button>
		</>
	);
}
