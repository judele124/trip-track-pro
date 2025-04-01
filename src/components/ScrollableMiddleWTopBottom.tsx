import { ReactNode } from 'react';

export default function ScrollableMiddleWTopBottom({
	bottom,
	middle,
	top,
}: {
	top: ReactNode | null;
	bottom: ReactNode | null;
	middle: ReactNode | null;
}) {
	return (
		<div className='relative flex grow flex-col overflow-hidden'>
			{top && <div>{top}</div>}
			{middle && <div className='overflow-y-auto'>{middle}</div>}
			{bottom && <div>{bottom}</div>}
		</div>
	);
}
