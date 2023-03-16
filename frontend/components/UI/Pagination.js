function Pagination({ pages, currentPage, setCurrentPage }) {
	return (
		<div className="flex justify-center mt-10 gap-2">
			{pages
				? [...Array(pages)].map((item, index) => {
						index++;
						return (
							<button
								key={index}
								className={`py-1 px-3 rounded-md border-2 ${
									currentPage === index
										? 'bg-primary text-white'
										: ''
								} hover:border-primary`}
								onClick={() => setCurrentPage(index)}
							>
								{index}
							</button>
						);
				  })
				: ''}
		</div>
	);
}

export default Pagination;
