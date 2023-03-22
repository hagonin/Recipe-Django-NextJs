import { memo, useState } from 'react';

function Tabs({ children }) {
	const [isActive, setIsActive] = useState(children[0]?.props.tab.title);
	return (
		<>
			<div className="flex gap-6">
				{children.map((child) => (
					<Btn
						key={child?.props?.tab.title}
						index={child?.props?.tab.title}
						isAct={isActive}
						onClick={() => setIsActive(child?.props?.tab.title)}
					>
						{child?.props?.tab.icon && (
							<span className="relative -top-[1px]">
								{child?.props?.tab.icon}
							</span>
						)}
						{child?.props?.tab.title}
					</Btn>
				))}
			</div>

			<div className="mt-5">
				{children.map((child) => (
					<div
						key={child?.props?.tab.title}
						className={`${
							isActive === child?.props?.tab.title ? 'block' : 'hidden'
						}`}
					>
						{child?.props?.children}
					</div>
				))}
			</div>
		</>
	);
}

const Btn = ({ index, isAct, onClick, children }) => {
	return (
		<button
			className={`font-bold text-lg py-4 px-4 border-b-2 flex items-center gap-2 ${
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
