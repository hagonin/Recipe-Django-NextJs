import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function Pagination({
	pages,
	currentPage,
	setCurrentPage,
	next,
	previous,
	small,
	onlyNumber,
}) {
	return (
		<div
			className={`flex justify-center ${
				small ? 'mt-2' : 'mt-10'
			} gap-2 flex-wrap`}
		>
			{pages ? (
				<>
					{!onlyNumber && (
						<Button
							iconLeft={<BsChevronLeft />}
							label="PRE"
							disabled={currentPage === 1}
							onClick={previous}
						/>
					)}
					{[...Array(pages)].map((item, index) => {
						index++;
						return small ? (
							<button
								key={index}
								className={`mx-1 text-base ${
									currentPage === index
										? 'underline text-red3'
										: ''
								} `}
								onClick={() => setCurrentPage(index)}
							>
								{index}
							</button>
						) : (
							<button
								key={index}
								className={`px-4 rounded-md ${
									currentPage === index
										? 'bg-primary text-white border-primary'
										: 'hover:bg-primaryLight'
								} hover:border-primary`}
								onClick={() => setCurrentPage(index)}
							>
								{index}
							</button>
						);
					})}
					{!onlyNumber && (
						<Button
							onClick={next}
							iconRight={<BsChevronRight />}
							label="NEXT"
							disabled={currentPage === pages}
						/>
					)}
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
		className="text-sm py-[2px] tracking-widest px-2 rounded-md border-2 border-border hover:border-primary text-black hover:bg-primaryLight hover:text-primary font-semibold focus-visible:outline-primary disabled:opacity-50 disabled:hover:bg-transparent  disabled:hover:border-border disabled:hover:text-black flex items-center gap-1 transition-all"
	>
		{iconLeft && iconLeft}
		{label}
		{iconRight && iconRight}
	</button>
);
export default Pagination;
