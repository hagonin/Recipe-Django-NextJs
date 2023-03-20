import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function Pagination({
	pages,
	currentPage,
	setCurrentPage,
	next,
	previous,
	small,
}) {
	return (
		<div className="flex justify-center mt-10 gap-2 flex-wrap ">
			{pages ? (
				<>
					{small ? (
						<button
							onClick={previous}
							disabled={currentPage === 1}
							className={`border rounded-md p-1 text-black bg-third border-border hover:bg-red3 hover:text-white transition-all disabled:hover:bg-third disabled:hover:text-black`}
						>
							<BsChevronLeft />
						</button>
					) : (
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
								className={`mx-1 ${
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
								className={`py-1 px-4 rounded-md ${
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
					{small ? (
						<button
							onClick={next}
							disabled={currentPage === pages}
							className={`border rounded-md p-1 text-black bg-third border-border hover:bg-red3 hover:text-white transition-all disabled:hover:bg-third disabled:hover:text-black`}
						>
							<BsChevronRight />
						</button>
					) : (
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
		className="text-sm tracking-widest py-1 px-3 rounded-md border-2 border-border hover:border-primary text-black hover:bg-primaryLight hover:text-primary font-semibold focus-visible:outline-primary disabled:opacity-50 disabled:hover:bg-transparent  disabled:hover:border-border disabled:hover:text-black flex items-center gap-1 transition-all"
	>
		{iconLeft && iconLeft}
		{label}
		{iconRight && iconRight}
	</button>
);
export default Pagination;
