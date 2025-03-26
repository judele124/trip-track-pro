import UserDetailsComponent from '@/components/UserDetailsComponent';
import { useAuthContext } from '@/contexts/AuthContext';
import UserCreatedTrips from './components/UserCreatedTrips';
import Icon from '@/components/icons/Icon';
import UserInParticipantsTrips from './components/UserInParticipantsTrips';

const ProfileView = () => {
	const { user, loading } = useAuthContext();

	if (loading) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<Icon className='fill-primary' size='50' name='spinner' />
			</div>
		);
	}

	return (
		<div className='flex size-full max-h-[600px] flex-col'>
			{user && (
				<UserDetailsComponent
					className='border-b-2 border-primary p-2'
					name={user.name || 'Default'}
					imageUrl={user.imageUrl || 'https://robohash.org/Default.png'}
					{...(user.role !== 'guest' ? { email: user.email } : {})}
				/>
			)}
			<UserCreatedTrips />
			<UserInParticipantsTrips />
		</div>
	);
};

export default ProfileView;
