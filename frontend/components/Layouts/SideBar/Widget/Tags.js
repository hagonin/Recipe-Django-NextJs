import Button from '@components/UI/Button';
import { tags } from '@utils/constants';
import useRecipes from 'hook/useRecipes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
							query: { ingredient_title: tag },
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
