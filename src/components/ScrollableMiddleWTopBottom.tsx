import { ReactNode } from 'react';

interface IScrollableMiddleWTopBottom {
	top: ReactNode | null;
	bottom: ReactNode | null;
	middle: ReactNode | null;
}

export default function ScrollableMiddleWTopBottom({
	bottom,
	middle,
	top,
}: IScrollableMiddleWTopBottom) {
	return (
		<div className='relative flex grow flex-col overflow-hidden'>
			{top && <div>{top}</div>}
			{middle && <div className='overflow-y-auto'>{middle}</div>}
			{bottom && <div>{bottom}</div>}
		</div>
	);
}
