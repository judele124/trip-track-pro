import { useState } from 'react';
import CreateTripForm from './components/CreateTripForm';
import ProgressLine from './components/ProgressLine';
import ShareTrip from './components/ShareTrip';

const STAGES_COUNT = 3;

export default function CreateTripView() {
	const [currentFormStage, setCurrentFormStage] = useState(0);

	return (
		<>
			{currentFormStage < STAGES_COUNT - 1 ? (
				<CreateTripForm
					currentFormStage={currentFormStage}
					setCurrentFormStage={setCurrentFormStage}
				/>
			) : (
				<ShareTrip />
			)}
			<ProgressLine
				className='absolute bottom-5 mt-auto w-full'
				length={3}
				index={currentFormStage}
			/>
		</>
	);
}
