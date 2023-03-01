import { memo, useState } from 'react';

function Tabs({ children }) {
	const [isActive, setIsActive] = useState(children[0]?.props.tab);
	return (
		<div className="mt-10">
			<div className="flex gap-6">
				{children.map((child) => (
					<Btn
						key={child?.props?.tab}
						index={child?.props?.tab}
						isAct={isActive}
						onClick={() => setIsActive(child?.props?.tab)}
					>
						{child?.props?.tab}
					</Btn>
				))}
			</div>

			<div className="mt-5">
				{children.map((child) => (
					<div
						key={child?.props?.tab}
						className={`${
							isActive === child?.props?.tab ? 'block' : 'hidden'
						}`}
					>
						{child?.props?.children}
					</div>
				))}
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

export const TabPanel = ({ children }) => children;
export default Tabs;
