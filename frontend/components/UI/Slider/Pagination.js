function Pagination({ dots, currentSlide, handleGoTo }) {
	let el = [];
	for (let dot = 0; dot < dots; dot++) {
		el.push(
			<button
				key={dot}
				className={`h-[0.65rem] w-[0.65rem] rounded-full mx-1 ${
					dot === currentSlide ? 'bg-primary' : 'bg-grey'
				}`}
				onClick={() => handleGoTo(dot)}
			></button>
		);
	}
	return el.length > 2 ? (
		<div className="mt-3 text-center lg:invisible visible mb-5">{el}</div>
	) : null;
}

export default Pagination;
