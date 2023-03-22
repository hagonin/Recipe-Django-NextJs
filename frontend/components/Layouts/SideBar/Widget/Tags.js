import { useRouter } from 'next/router';
import { tags } from '@utils/constants';
import Button from '@components/UI/Button';

function Tags() {
	const router = useRouter();
	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<Button
					key={tag}
					type="link"
					onClick={() =>
						router.push({
							pathname: '/search',
							query: { ingredients__title: tag },
						})
					}
					className="tag"
				>
					{tag}
				</Button>
			))}
		</div>
	);
}

export default Tags;
