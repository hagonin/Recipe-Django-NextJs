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
							id <= number ? 'text-yellow-500' : 'text-black'
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
