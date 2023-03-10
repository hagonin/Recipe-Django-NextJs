import { ratingScale } from '@utils/constants';
import { useEffect, useState } from 'react';
import { HiStar } from 'react-icons/hi';
import { Label } from '../FormControl';

function Start({
	handleChangeStart = () => {},
	initValue = 1,
	disabled,
	submitSuccess,
}) {
	const [rating, setRating] = useState(initValue);

	useEffect(() => {
		rating && handleChangeStart(rating);
	}, [rating]);

	useEffect(() => {
		submitSuccess && setRating(1);
	}, [submitSuccess]);
	return (
		<div className="flex lg:gap-4 lg:items-center flex-col lg:flex-row mt-3">
			<Label label="Your rating" />
			<div className="flex gap-2 items-center">
				{ratingScale.map(({ id }) => {
					return (
						<button
							key={id}
							type="button"
							onClick={() => setRating(id)}
							className={`text-[2rem] mb-2 ${
								id <= rating ? 'text-yellow' : 'text-black'
							}`}
							disabled={disabled}
						>
							<HiStar />
						</button>
					);
				})}
				<span className="mb-1">{ratingScale[rating - 1]?.content}</span>
			</div>
		</div>
	);
}

export default Start;
