function ShowPages({ pages, currentPage, isSearch }) {
	return pages ? (
		<span className="md:text-lg text-[0.85rem] text-black text-right">
			Showing
			<span className="text-lg font-bold mx-1">{currentPage}</span>
			{`of ${pages} page${pages > 1 ? 's' : ''}`}
		</span>
	) : (
		<></>
	);
}

export default ShowPages;
