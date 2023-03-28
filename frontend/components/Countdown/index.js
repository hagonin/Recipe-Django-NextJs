import { useEffect, useState } from 'react';

import { formatCounter } from '@utils/formatTime';
import {
	checkExpiredTime,
	getCurrentTime,
	getExpiredTimeFromLocalStage,
	removeExpiredTime,
} from '@utils/expired_time';
import { images } from '@utils/constants';
import { useAuthContext } from '@context/auth-context';
import Img from '@components/UI/Image';

function CountDown() {
	const { user } = useAuthContext();
	const [currentTime, setCurrentTime] = useState(null);
	useEffect(() => {
		let idInterval;
		if (currentTime === null) {
			const time =
				checkExpiredTime(user.id) &&
				getExpiredTimeFromLocalStage(user.id) - getCurrentTime();
			const parse = parseInt(time);
			parse && setCurrentTime(parse > 0 ? parse : 0);
		} else {
			idInterval = setInterval(() => {
				if (currentTime > 0) {
					setCurrentTime((pre) => --pre);
				} else {
					setCurrentTime(null);
					removeExpiredTime(user.id);
				}
			}, 1000);
		}
		return () => {
			idInterval && clearInterval(idInterval);
		};
	}, [currentTime, user]);

	return (
		<div className="container py-6 md:py-24 flex flex-col md:flex-row gap-x-6 gap-y-2 lg:gap-x-24 items-center justify-center ">
			<div className="max-md:order-0 max-md:text-center">
				<h1 className="text-[2.1rem] font-bold mb-5">Oooops!</h1>
				<p>You have reached the daily free upload limit of HomeCook</p>
				<p>You will be able to add more recipes in</p>
				<span className="md:text-[3rem] text-[2.8rem] font-bold text-center  text-black block md:my-16 mt-8">
					{formatCounter(currentTime)}
				</span>
			</div>
			<div className="max-md:order-first">
				<Img
					src={images.expired}
					alt="expired"
					className="xl:h-[400px] xl:w-[450px] lg:h-[500px] lg:w-[400px] md:h-[270px] md:w-[270px] h-[300px] w-[300px] mx-auto max-md:mt-5"
					cover
				/>
			</div>
		</div>
	);
}

export default CountDown;
