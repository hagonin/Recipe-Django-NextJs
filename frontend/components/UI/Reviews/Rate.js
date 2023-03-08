import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

function Rating({ number, small }) {
	return (
		<div className="flex gap-[1px] items-center">
			<span className={`${small ? 'text-sm' : 'text-xl'} text-yellow`}>
				{number > 0.5 ? (
					<BsStarFill />
				) : number >= 0 && number <= 0.5 ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>

			<span className={`${small ? 'text-sm' : 'text-xl'} text-yellow`}>
				{number > 1.5 ? (
					<BsStarFill />
				) : number > 1 && number <= 1.5 ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
			<span className={`${small ? 'text-sm' : 'text-xl'} text-yellow`}>
				{number > 2.5 ? (
					<BsStarFill />
				) : number > 2 && number <= 2.5 ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
			<span className={`${small ? 'text-sm' : 'text-xl'} text-yellow`}>
				{number > 3.5 ? (
					<BsStarFill />
				) : number > 3 && number <= 3.5 ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
			<span className={`${small ? 'text-sm' : 'text-xl'} text-yellow`}>
				{number > 4.5 ? (
					<BsStarFill />
				) : number > 4 && number <= 4.5 ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
		</div>
	);
}

export default Rating;
