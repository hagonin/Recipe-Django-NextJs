import { ratingScale } from '@utils/constants';
import { HiStar } from 'react-icons/hi';

function Rating({ number }) {
	return (
		<div className="flex gap-[1px] items-center">
			{ratingScale.map(({ id }) => {
				return (
					<button
						key={id}
						type="button"
						className={`text-xl ${
							id <= number ? 'text-red' : 'text-black'
						}`}
					>
						<HiStar />
					</button>
				);
			})}
		</div>
	);
}

export default Rating;
