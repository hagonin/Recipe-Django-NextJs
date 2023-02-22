import { useState } from 'react';

function Tabs() {
	const [isActive, setIsActive] = useState(0);
	return (
		<div className="mt-10">
			<div className="flex gap-6">
				<Btn
					index={0}
					isAct={isActive}
					onClick={() => setIsActive(0)}
				>
					All Recipes
				</Btn>
				<Btn
					index={1}
					isAct={isActive}
					onClick={() => setIsActive(1)}
				>
					Bookmarks
				</Btn>
			</div>
			<div className="mt-5">
				<div
					className={`min-h-[300px] bg-yellow-200 ${
						isActive === 0 ? 'block' : 'hidden'
					}`}
				></div>
				<div
					className={`min-h-[300px] bg-gray-200 ${
						isActive === 1 ? 'block' : 'hidden'
					}`}
				></div>
			</div>
		</div>
	);
}

const Btn = ({ index, isAct, onClick, children }) => {
	return (
		<button
			className={`font-bold text-lg py-4 px-4 border-b-2 ${
				index === isAct
					? 'border-primary text-primary'
					: ' border-transparent text-black'
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Tabs;
