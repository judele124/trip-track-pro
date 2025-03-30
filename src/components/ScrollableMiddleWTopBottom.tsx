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
		<div className='relative flex h-full flex-col'>
			{top && <div>{top}</div>}
			{middle && <div className='grow overflow-y-hidden'>{middle}</div>}
			{bottom && <div>{bottom}</div>}
		</div>
	);
}
