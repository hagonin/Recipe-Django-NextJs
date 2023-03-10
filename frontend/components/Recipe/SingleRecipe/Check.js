import { useState } from 'react';

function Check({ label }) {
	const [check, setCheck] = useState(false);

	return (
		<label
			className={`text-base capitalize select-none cursor-pointer block border-b border-border py-1 ${
				check ? 'line-through' : ''
			}`}
		>
			<input
				type="checkbox"
				onChange={() => setCheck(!check)}
				value={check}
				className="mr-3 text-base relative top-[1px]"
			/>
			{label}
		</label>
	);
}

export default Check;
