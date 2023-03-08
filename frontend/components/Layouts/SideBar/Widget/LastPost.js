import RecipeCard from '@components/Recipe/RecipeCard';
import useLastestPost from 'hook/useLastestPost';

function LastPost({ isFooter, number = 3 }) {
	const { data } = useLastestPost(number);

	return (
		<div
			className={`${
				isFooter
					? 'grid grid-cols-2 lg:gap-6 md:gap-4 gap-2'
					: 'flex flex-col gap-4 w-full'
			}`}
		>
			{data
				? data.slice(0, number).map((item) => (
						<RecipeCard
							slug={item.slug}
							image={item.image_url}
							name={item.title}
							date={item.created_at}
							lastPost
						/>
				  ))
				: null}
		</div>
	);
}

export default LastPost;
