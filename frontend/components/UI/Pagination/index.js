import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function Pagination({ pages, currentPage, setCurrentPage, next, previous }) {
	return (
		<div className="flex justify-center mt-10 gap-2">
			{pages ? (
				<>
					<Button
						iconLeft={<BsChevronLeft />}
						label="PREVIOUS"
						disabled={currentPage === 1}
						onClick={previous}
					/>
					{[...Array(pages)].map((item, index) => {
						index++;
						return (
							<button
								key={index}
								className={`py-1 px-3 rounded-md border-2 ${
									currentPage === index
										? 'bg-primary text-white border-primary'
										: ''
								} hover:border-primary`}
								onClick={() => setCurrentPage(index)}
							>
								{index}
							</button>
						);
					})}
					<Button
						onClick={next}
						iconRight={<BsChevronRight />}
						label="NEXT"
						disabled={currentPage === pages}
					/>
				</>
			) : (
				''
			)}
		</div>
	);
}

const Button = ({ onClick, disabled, label, iconLeft, iconRight }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className="text-sm tracking-widest py-1 px-3 rounded-md border-2 border-border hover:border-primary text-black hover:text-primary font-semibold focus-visible:outline-primary disabled:opacity-50 disabled:hover:bg-transparent  disabled:hover:border-border disabled:hover:text-black flex items-center gap-1 transition-all"
	>
		{iconLeft && iconLeft}
		{label}
		{iconRight && iconRight}
	</button>
);
export default Pagination;
