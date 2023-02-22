import { useEffect, useRef, useState } from 'react';

function Check({ label }) {
	const [check, setCheck] = useState(false);

	return (
		<label
			className={`select-none cursor-pointer block border-b border-border pb-2 ${
				check ? 'line-through' : ''
			}`}
		>
			<input
				type="checkbox"
				onChange={() => setCheck(!check)}
				value={check}
				className="mr-3"
			/>
			{label}
		</label>
	);
}

export default Check;
