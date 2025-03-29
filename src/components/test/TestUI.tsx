import ScrollableMiddleWTopBottom from '../ScrollableMiddleWTopBottom';

export function TestUI() {
	return (
		<div>
			<ScrollableMiddleWTopBottom
				top={<div className='bg-red-300'>asd</div>}
				bottom={<div className='h-full bg-red-300'>asd</div>}
				middle={<div className='bg-red-300'>asd</div>}
			/>
		</div>
	);
}
