import { isValidHttpUrl } from '@utils/checkValidHttpUrl';
import Link from 'next/link';

function Source({ source }) {
	if (isValidHttpUrl(source)) {
		return (
			<Link
				href={source}
				className="italic mt-3 underline"
			>
				Source: {source}
			</Link>
		);
	} else {
		return <p className="italic mt-3">Source: {source}</p>;
	}
}

export default Source;
