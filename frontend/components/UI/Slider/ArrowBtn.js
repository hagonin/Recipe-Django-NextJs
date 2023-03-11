import { memo, useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

function ArrowBtn({ right, onClick }) {
	return (
		<button
			onClick={onClick}
			className={` border border-border lg:visible invisible md:text-[2rem]  text-white md:p-2 p-2 rounded-full absolute top-[43%] -translate-y-1/2 bg-[rgba(255,255,255,0.7)] ${
				right ? 'right-3' : 'left-3'
			} hover:bg-[rgba(255,255,255,0.8)] hover:text-black transition-all duration-300`}
		>
			<span className='text-[2.7rem]'>
				{right ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
			</span>
		</button>
	);
}

export default memo(ArrowBtn);
