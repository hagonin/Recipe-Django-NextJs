import { memo, useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

function ArrowBtn({ right, onClick, disabled }) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`border-2 border-border lg:visible invisible md:text-[2rem]  text-black md:p-2 p-2 rounded-full absolute top-[43%] -translate-y-1/2 bg-[rgba(255,255,255,0.9)]  hover:bg-[rgba(255,255,255,0.8)] hover:border-primary hover:text-primary transition-all duration-300 disabled:bg-[rgba(255,255,255,0.4)] disabled:text-grey disabled:border-border ${
				right ? 'right-3' : 'left-3'
			}`}
		>
			<span className="text-[2.7rem]">
				{right ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
			</span>
		</button>
	);
}

export default memo(ArrowBtn);
