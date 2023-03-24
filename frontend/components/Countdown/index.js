import { useEffect, useState } from 'react';
import { formatCounter } from '@utils/formatTime';
import { getCurrentTime, KEY_EXPIRED } from '@utils/expired_time';
import { useRouter } from 'next/router';
import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import Button from '@components/UI/Button';

function CountDown() {
	const [currentTime, setCurrentTime] = useState(null);
	const router = useRouter();
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
		<div className="md:py-24 py-10 grid md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-4 lg:w-[60%] w-full container mx-auto max-md:text-center ">
			<div className="max-md:order-0">
				<h1 className="text-[2.1rem] font-bold mb-5">Oooops!</h1>
				<p>You have reached the daily free upload limit of HomeCook</p>
				<p>You will be able to add more recipes in</p>
				<span className="md:text-[3rem] text-[2.8rem] font-bold text-center  text-black block md:my-16 mt-8">
					{formatCounter(currentTime)}
				</span>
				<Button
					onClick={() => router.push('/')}
					className="primary !h-11 max-md:mt-10"
				>
					Back to Home
				</Button>
			</div>
			<div className="max-md:order-1">
				<Img
					src={images.expired}
					alt="expired"
					className="lg:h-[300px] lg:w-[300px] md:h-[270px] md:w-[270px] h-[300px] w-[300px] mx-auto max-md:mt-5"
				/>
			</div>
		</div>
	);
}

export default CountDown;
