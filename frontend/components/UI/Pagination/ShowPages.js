function ShowPages({ pages, currentPage }) {
	return pages ? (
		<span className="text-base text-right">
			showing
			<span className="text-base font-bold mx-1">{currentPage}</span>
			{`of ${pages} page${pages > 1 ? 's' : ''}`}
		</span>
	) : (
		<></>
	);
}

export default ShowPages;
