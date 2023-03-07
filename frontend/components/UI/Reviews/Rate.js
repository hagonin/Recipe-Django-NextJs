import { ratingScale } from '@utils/constants';
import { GiRoundStar } from 'react-icons/gi';

function Rating({ number , small}) {
	return (
		<div className="flex gap-[1px] items-center">
			{ratingScale.map(({ id }) => {
				return (
					<button
						key={id}
						type="button"
						className={`${small ? 'text-sm' : 'text-xl'} ${
							id <= number ? 'text-yellow' : 'text-black'
						}`}
					>
						<GiRoundStar />
					</button>
				);
			})}
		</div>
	);
}

export default Rating;
