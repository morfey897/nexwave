function Table({ headers }: { headers: string[] }) {
	return (
		<table className='min-w-full text-left'>
			<thead className='bg-gray-1 dark:bg-dark-3 sticky top-[110px] z-50 rounded-lg md:top-[130px]'>
				<tr className='text-primary-text rounded-lg'>
					<th className='rounded-ss-lg px-4 py-2'>Header 1</th>
					<th className='hidden px-4 py-2 md:table-cell'>Header 2</th>
					<th className='hidden px-4 py-2 md:table-cell'>Header 3</th>
					<th className='hidden px-4 py-2 md:table-cell'>Header 4</th>
					<th className='rounded-se-lg px-4 py-2'>Header 5</th>
				</tr>
			</thead>
			<tbody className='bg-secondary'>
				{new Array(30)
					.fill(0)
					.map((_, index) => index)
					.map((key) => (
						<tr key={key} className='border-stroke dark:border-dark-5 border-t'>
							<td className='px-4 py-2'>Row 1, Column 1</td>
							<td className='hidden px-4 py-2 md:table-cell'>
								Row 1, Column 2
							</td>
							<td className='hidden px-4 py-2 md:table-cell'>
								Row 1, Column 3
							</td>
							<td className='hidden px-4 py-2 md:table-cell'>
								Row 1, Column 4
							</td>
							<td className='px-4 py-2'>|</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}

export default Table;
