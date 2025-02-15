const ParticipantsView = () => {
	const details = [
		{ name: 'Netanel Segal', distance: '2.5 km', score: 2900 },
		{ name: 'Juda Gotliv', distance: '2.5 km', score: 2300 },
		{ name: 'Fake Name', distance: '2.5 km', score: 2900 },
		{ name: 'Netanel Segal', distance: '2.5 km', score: 2900 },
		{ name: 'Juda Gotliv', distance: '2.5 km', score: 2300 },
		{ name: 'Fake Name', distance: '2.5 km', score: 2900 },
		{ name: 'Netanel Segal', distance: '2.5 km', score: 2900 },
		{ name: 'Juda Gotliv', distance: '2.5 km', score: 2300 },
		{ name: 'Fake Name', distance: '2.5 km', score: 2900 },
		{ name: 'Netanel Segal', distance: '2.5 km', score: 2900 },
		{ name: 'Juda Gotliv', distance: '2.5 km', score: 2300 },
		{ name: 'Fake Name', distance: '2.5 km', score: 2900 },
		{ name: 'Netanel Segal', distance: '2.5 km', score: 2900 },
		{ name: 'Juda Gotliv', distance: '2.5 km', score: 2300 },
		{ name: 'Fake Name', distance: '2.5 km', score: 2900 },
	];
	return (
		<div
			style={{ scrollbarWidth: 'thin' }}
			className='flex h-full justify-center overflow-y-auto px-4'
		>
			<table className='shadow-md'>
				<thead>
					<tr className='sticky top-0 rounded-xl border-0 bg-orange-600 text-left text-white'>
						<th className='px-4 py-2'>Name</th>
						<th className='px-4 py-2'>Distance</th>
						<th className='px-4 py-2'>Score</th>
						<th className=''></th>
					</tr>
				</thead>
				<tbody className=''>
					{details.map((row, index) => (
						<tr
							key={index}
							className='border-t border-primary hover:bg-amber-200'
						>
							<td className='px-4 py-3'>{row.name}</td>
							<td className='px-4 py-3'>{row.distance}</td>
							<td className='px-4 py-3'>{row.score}</td>
							<td className=''>
								<button className='text-gray-500 hover:text-gray-700'>
									<svg
										width='4'
										height='19'
										viewBox='0 0 4 19'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<rect
											width='3.89808'
											height='4.0162'
											rx='1.94904'
											fill='#EBE2D4'
										/>
										<rect
											y='7.26465'
											width='3.89808'
											height='4.0162'
											rx='1.94904'
											fill='#EBE2D4'
										/>
										<rect
											y='14.5291'
											width='3.89808'
											height='4.0162'
											rx='1.94904'
											fill='#EBE2D4'
										/>
									</svg>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ParticipantsView;
