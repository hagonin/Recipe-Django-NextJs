function ShowPages({ pages, currentPage }) {
	return pages ? (
		<span className="text-lg text-right">
			Showing
			<span className="text-lg font-bold mx-1">{currentPage}</span>
			{`of ${pages} page${pages > 1 ? 's' : ''}`}
		</span>
	) : (
		<></>
	);
}

export default ShowPages;
