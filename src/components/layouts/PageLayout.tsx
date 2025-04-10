import { Outlet } from 'react-router-dom';

const PageLayout = () => {
	return (
		<div className='page-colors page-padding relative flex h-dvh flex-col'>
			<div className='relative flex w-full flex-1 flex-col overflow-hidden sm:mx-auto sm:max-w-[400px]'>
				<Outlet />
			</div>
		</div>
	);
};

export default PageLayout;
