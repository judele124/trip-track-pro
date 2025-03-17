interface IUserDetailsComponentProps {
	name: string;
	imageUrl: string;
	email?: string;
	className?: string;
}

const UserDetailsComponent = ({
	name,
	imageUrl,
	email,
	className = '',
}: IUserDetailsComponentProps) => {
	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<img
				src={imageUrl}
				alt='Profile'
				className='h-16 w-16 rounded-full bg-dark dark:bg-light'
			/>
			<div>
				<h3 className='text-xl font-bold'>{name}</h3>
				{email && <p className='text-sm opacity-75'>{email}</p>}
			</div>
		</div>
	);
};

export default UserDetailsComponent;
