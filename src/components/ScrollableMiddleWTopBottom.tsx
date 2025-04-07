import { forwardRef, ReactNode } from 'react';

interface IScrollableMiddleWTopBottomProps {
	top: ReactNode | null;
	bottom: ReactNode | null;
	middle: ReactNode | null;
}

export default forwardRef<HTMLDivElement, IScrollableMiddleWTopBottomProps>(
	function ScrollableMiddleWTopBottom(
		{ bottom, middle, top }: IScrollableMiddleWTopBottomProps,
		ref
	) {
		return (
			<div ref={ref} className='relative flex grow flex-col overflow-hidden'>
				{top && <div>{top}</div>}
				{middle && <div className='overflow-y-auto'>{middle}</div>}
				{bottom && <div>{bottom}</div>}
			</div>
		);
	}
);
