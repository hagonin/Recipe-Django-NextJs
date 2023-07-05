import { memo } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function ArrowBtn({ right, onClick, disabled, smallBtn }) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`border-2 border-border lg:visible invisible   text-black rounded-full absolute top-[43%] -translate-y-1/2 bg-[rgba(255,255,255,0.9)]  hover:bg-[rgba(255,255,255,0.8)] hover:border-primary hover:text-primary transition-all duration-300 disabled:bg-[rgba(255,255,255,0.4)] disabled:text-grey disabled:border-border ${
				right ? 'right-3' : 'left-3'
			} ${smallBtn ? 'p-2 ' : 'p-3'}`}
		>
			<span className={`${smallBtn ? 'text-[2rem]' : 'text-[2.5rem]'}`}>
				{right ? <BsChevronRight /> : <BsChevronLeft />}
			</span>
		</button>
	);
}

export default memo(ArrowBtn);
