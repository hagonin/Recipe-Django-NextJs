import { isValidHttpUrl } from '@utils/checkValidHttpUrl';
import Link from 'next/link';

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
	// if (isValidHttpUrl(source)) {
	// 	return (
	// 		<Link
	// 			href={source}
	// 			className="italic mt-3 underline"
	// 		>
	// 			Source: {source}
	// 		</Link>
	// 	);
	// } else {
	// 	return ;
	// }
}

export default Source;
