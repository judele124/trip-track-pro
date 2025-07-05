import { useFormContext } from 'react-hook-form';
import Button from '@/components/ui/Button';
import TextareaWLabel from '@/components/ui/TextareaWLabel';

const TreasureFindForm = () => {
	const { register } = useFormContext();

	return (
		<>
			<TextareaWLabel
				title='Treasure Description'
				placeholder='Enter treasure description'
				{...register('treasureDescription')}
			/>
			<Button primary className='w-full' about='add a photo'>
				Add a Photo
			</Button>
		</>
	);
};

export default TreasureFindForm;
