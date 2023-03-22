import Link from 'next/link';
import { isValidHttpUrl } from '@utils/checkValidHttpUrl';

function Source({ source }) {
	return isValidHttpUrl(source) ? (
		<p className="italic mt-3">
			If you desire additional tips, read further
			<a
				href={source}
				className="underline ml-1"
			>
				herein
			</a>
			.
		</p>
	) : null;
}

export default Source;
