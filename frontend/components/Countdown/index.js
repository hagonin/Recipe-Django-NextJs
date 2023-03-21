import { useEffect, useRef, useState } from 'react';

function CountDown({ timer, handleCloseModal }) {
	const [counter, setCounter] = useState(timer);
	useEffect(() => {
		const current = setInterval(() => {
			counter === 0 ? handleCloseModal() : setCounter((pre) => --pre);
		}, 1000);
		return () => {
			clearInterval(current);
		};
	}, [counter]);
	return (
		<div>
			<p>
				You have reached the daily free upload limit for Homecook. At
				05:00:00, you will be able to add more recipes
			</p>
			<p>
				You have reached the daily free upload limit for Homecook. At
				05:00:00, you will be able to add more recipes*
			</p>
			<span className="text-3xl">{counter}</span>
		</div>
	);
}

export default CountDown;
