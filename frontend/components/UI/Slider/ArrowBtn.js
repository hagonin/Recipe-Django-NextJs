import { memo, useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

function ArrowBtn({ right, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`lg:visible invisible md:text-[2rem] text-3xl text-white md:p-3 p-2 rounded-full absolute top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.5)] ${
				right ? 'right-3' : 'left-3'
			} hover:bg-[rgba(255,255,255,0.8)] hover:text-black transition-all duration-300`}
		>
			{right ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
		</button>
	);
}

export default memo(ArrowBtn);
