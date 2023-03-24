import { useEffect, useState } from 'react';
import { formatCounter } from '@utils/formatTime';
import { images } from '@utils/constants';
import { getCurrentTime, KEY_EXPIRED } from '@utils/expired_time';
import Img from '@components/UI/Image';
import { TitlePrimary } from '@components/UI/Title';

function CountDown() {
	const [currentTime, setCurrentTime] = useState(null);
	useEffect(() => {
		let idInterval;
		if (currentTime === null) {
			const time =
				localStorage.getItem(KEY_EXPIRED) &&
				localStorage.getItem(KEY_EXPIRED) - getCurrentTime();
			const parse = parseInt(time);
			parse && setCurrentTime(parse > 0 ? parse : 0);
		} else {
			idInterval = setInterval(() => {
				if (currentTime > 0) {
					setCurrentTime((pre) => --pre);
				} else {
					setCurrentTime(null);
					localStorage.removeItem(KEY_EXPIRED);
				}
			}, 1000);
		}
		return () => {
			idInterval && clearInterval(idInterval);
		};
	}, [currentTime]);

	return (
		<div className="py-10 text-center">
			{currentTime ? (
				<>
					<span className="md:text-[3rem] text-[2.2rem] font-bold text-primaryDark block my-8">
						{formatCounter(currentTime)}
					</span>
					<TitlePrimary title="Sorry" />
					<p className="mx-auto mt-3 text-base">
						You have reached the daily free upload limit for
						Homecook.
						<br /> You will be able to add more recipes after time
					</p>
				</>
			) : (
				<h2 className="font-serif mt-7">
					You can add more recipes now
				</h2>
			)}
		</div>
	);
}

export default CountDown;
