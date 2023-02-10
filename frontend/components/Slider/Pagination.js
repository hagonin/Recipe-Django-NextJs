function Pagination({ dots, currentSlide, handleGoTo }) {
	let el = [];
	for (let dot = 0; dot < dots; dot++) {
		el.push(
			<button
				key={dot}
				className={`h-3 w-3 rounded-full mx-1 ${
					dot === currentSlide ? 'bg-primary' : 'bg-grey'
				}`}
				onClick={() => handleGoTo(dot)}
			></button>
		);
	}
	return <div className="mt-3 text-center lg:invisible visible">{el}</div>;
}

export default Pagination;
