import { useEffect, useRef, useState } from 'react';

function Check({ label }) {
	const [check, setCheck] = useState(false);

	return (
		<label
			className={`text-base select-none cursor-pointer block border-b border-border pb-2 ${
				check ? 'line-through' : ''
			}`}
		>
			<input
				type="checkbox"
				onChange={() => setCheck(!check)}
				value={check}
				className="mr-3 text-base"
			/>
			{label}
		</label>
	);
}

export default Check;
