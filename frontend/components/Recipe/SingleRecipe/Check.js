import { useState } from 'react';

function Check({ children }) {
	const [check, setCheck] = useState(false);

	return (
		<label
			className={`text-base select-none cursor-pointer block border-b border-border py-1 ${
				check ? 'line-through' : ''
			} first-letter:capitalize `}
		>
			<input
				type="checkbox"
				onChange={() => setCheck(!check)}
				value={check}
				className="mr-3 text-base relative md:top-[1px] top-[3px]"
			/>
			{children}
		</label>
	);
}

export default Check;
