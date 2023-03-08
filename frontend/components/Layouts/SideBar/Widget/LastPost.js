import RecipeCard from '@components/Recipe/RecipeCard';
import useLastestPost from 'hook/useLastestPost';

function LastPost() {
	const { data } = useLastestPost();

	return (
		<div className="flex flex-col gap-4">
			{data
				? data.slice(0, 3).map((item) => (
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
