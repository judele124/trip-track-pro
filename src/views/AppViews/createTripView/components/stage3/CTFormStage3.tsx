import Icon from '@/components/icons/Icon';
import Modal from '@/components/ui/Modal';
import useToggle from '@/hooks/useToggle';
import React, { useState } from 'react';

export default function CTFormStage3() {
	const { isOpen: securityIsOpen, toggle: toggleSecurity } = useToggle();
	const { isOpen: groupModeIsOpen, toggle: toggleGroupMode } = useToggle();

	const [hasGuides, setHasGuides] = useState(false);

	return (
		<div className='min-h-screen max-w-md space-y-8 p-6'>
			{/* Title */}
			<h2 className='text-center text-2xl font-bold text-black'>הגדרות טיול</h2>

			<div>
				<div className='flex flex-row justify-between border-b-2 border-gray-900 p-3'>
					<span className='text-left'>Group-Mode</span>
					<i onClick={toggleGroupMode}>
						<Icon
							name='chevronRight'
							className={`fill-primary ${groupModeIsOpen ? 'rotate-90' : ''}`}
						/>
					</i>
				</div>
				<div className='flex flex-row justify-between border-b-2 border-gray-900 p-3'>
					<span className='text-left'>Security</span>
					<i onClick={toggleSecurity}>
						<Icon
							name='chevronRight'
							className={`fill-primary ${securityIsOpen ? 'rotate-90' : ''}`}
						/>
					</i>
				</div>
			</div>

			{/* Toggle Row */}
			<div className=''>
				<SettingToggle
					label='With guides?'
					checked={hasGuides}
					onChange={() => setHasGuides(!hasGuides)}
				/>
			</div>

			<SecurityModel isOpen={securityIsOpen} toggleSecurity={toggleSecurity} />
			<GroupModeModel
				isOpen={groupModeIsOpen}
				toggleGroupMode={toggleGroupMode}
			/>

			{/* Confirm Button */}
			<button className='w-full rounded-full bg-black py-3 text-lg text-white transition hover:bg-gray-800'>
				Confirm
			</button>
		</div>
	);
}

interface SettingToggleProps {
	label: string;
	checked: boolean;
	onChange: () => void;
}

function SettingToggle({ label, checked, onChange }: SettingToggleProps) {
	return (
		<div className='flex items-center justify-between border-b-2 border-gray-900 p-4'>
			<span className='font-medium text-black'>{label}</span>
			<button
				onClick={onChange}
				className={`relative h-6 w-12 rounded-full transition-colors duration-300 ${
					checked ? 'bg-orange-500' : 'bg-gray-300'
				}`}
			>
				<span
					className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
						checked ? 'translate-x-6' : 'translate-x-0'
					}`}
				></span>
			</button>
		</div>
	);
}

interface ISecurityModelProps {
	isOpen: boolean;
	toggleSecurity: () => void;
}
const SecurityModel = ({ isOpen, toggleSecurity }: ISecurityModelProps) => {
	const [radius, setRadius] = useState(100);
	const [hasGuides, setHasGuides] = useState(false);
	const [alertTravelers, setAlertTravelers] = useState(false);
	const [mustBeBetweenGuides, setMustBeBetweenGuides] = useState(false);
	return (
		<Modal open={isOpen} onBackdropClick={toggleSecurity} center>
			<div className='page-colors w-[400px] space-y-8 rounded-lg p-6 text-lg'>
				<SettingToggle
					label='With guides?'
					checked={hasGuides}
					onChange={() => setHasGuides(!hasGuides)}
				/>
				<SettingToggle
					label='user must be between guides'
					checked={mustBeBetweenGuides}
					onChange={() => {
						if (!hasGuides) setHasGuides(true);
						setMustBeBetweenGuides(!mustBeBetweenGuides);
					}}
				/>
				<SettingToggle
					label='Alert trvelers is out of range?'
					checked={alertTravelers}
					onChange={() => {
						setAlertTravelers(!alertTravelers);
					}}
				/>
				{alertTravelers && (
					<div className='flex flex-row justify-between border-b-2 border-gray-900 px-2 pb-3'>
						<span className='text-left'>Alert radius (in meters):</span>
						<div className=''>
							<input
								type='range'
								min={30}
								max={200}
								value={radius}
								onChange={(e) => setRadius(Number(e.target.value))}
								className='w-full p-0 accent-primary'
							/>
							<label className='text-base font-medium'>from {radius}</label>
						</div>
					</div>
				)}
			</div>
		</Modal>
	);
};

interface IGroupModeModelProps {
	isOpen: boolean;
	toggleGroupMode: () => void;
}

const GroupModeModel = ({ isOpen, toggleGroupMode }: IGroupModeModelProps) => {
	const [hasGroups, setHasGroups] = useState(false);
	const [allTogether, setAllTogether] = useState(true);
	return (
		<Modal open={isOpen} onBackdropClick={toggleGroupMode} center>
			<div className='page-colors w-[400px] space-y-8 rounded-lg p-6 text-lg'>
				<SettingToggle
					label='Groups?'
					checked={hasGroups}
					onChange={() => {
						setAllTogether(false);
						setHasGroups(!hasGroups);
					}}
				/>
				<SettingToggle
					label='All together?'
					checked={allTogether}
					onChange={() => {
						setHasGroups(false);
						setAllTogether(!allTogether);
					}}
				/>
			</div>
		</Modal>
	);
};
