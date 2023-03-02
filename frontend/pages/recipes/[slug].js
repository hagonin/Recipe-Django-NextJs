import api from '@services/axios';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';
import Thumbnail from '@components/UI/Slider/Thumbnail';
import SubscribeSection from '@components/SubcribeSection';
import CommentForm from '@components/Form/CommentForm';
import CommentCard from '@components/Comment/CommentCard';
import Comments from '@components/Comment';
import { ENDPOINT_RECIPE, ENDPOINT_RECIPE_DETAIL } from '@utils/constants';
import { useAuthContext } from '@context/auth-context';
import Reviews from '@components/UI/Reviews';
import { toast } from 'react-toastify';
import { useState } from 'react';

function Recipe({ recipe }) {
	const { isAuthenticated, configAuth, user: userAuthen } = useAuthContext();
	const { image_url, user, slug, reviews, ..._recipe } = recipe;
	const [listReviews, setListReviews] = useState(reviews);
	const relatedRecipes = [
		{
			id: 1,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 2,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 3,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 4,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
		{
			id: 5,
			name: 'Simple Blueberry Muffins',
			date: 'January 18, 2021',
			image: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/05/32-878x1024.jpg',
		},
	];

	const chat = [
		{
			id: 1,
			name: 'Thomas',
			avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/themes/cuisine/assets/img/cuisine_author.jpg',
			date: 'January 19, 2021',
			time: '3:15 pm',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
			comments: [
				{
					id: 1,
					name: 'Thomas',
					avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/themes/cuisine/assets/img/cuisine_author.jpg',
					date: 'January 19, 2021',
					time: '3:15 pm',
					message:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
				},
				{
					id: 2,
					name: 'Thomas',
					avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/themes/cuisine/assets/img/cuisine_author.jpg',
					date: 'January 19, 2021',
					time: '3:15 pm',
					message:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
				},
			],
		},
		{
			id: 2,
			name: 'Thomas',
			avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/themes/cuisine/assets/img/cuisine_author.jpg',
			date: 'January 19, 2021',
			time: '3:15 pm',
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
			comments: [
				{
					id: 1,
					name: 'Thomas',
					avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/themes/cuisine/assets/img/cuisine_author.jpg',
					date: 'January 19, 2021',
					time: '3:15 pm',
					message:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
				},
			],
		},
	];

	const handleSubmitReview = async (data) => {
		try {
			const res = await api.post(
				`/recipe/${slug}/reviews`,
				{ ...data, avatar: userAuthen?.avatar },
				configAuth()
			);
			const recipe = res?.data;
			toast.success('Your review has been submitted successfully.');
			setListReviews((preReviews) => {
				return [recipe, ...preReviews];
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = (index) =>
		// await api.delete()
		setListReviews((pre) => {
			const newArr = [...pre];
			newArr.splice(index, 1);
			return newArr;
		});
	return (
		<>
			<SingRecipe
				{..._recipe}
				cover={image_url}
				author={user}
			/>
			<Reviews
				isAuth={isAuthenticated}
				onSubmit={handleSubmitReview}
				reviews={listReviews}
				currentName={userAuthen?.username}
				handleDelete={handleDelete}
			/>

			<SubscribeSection />
			<RelatedRecipe recipes={relatedRecipes} />

			<div className="mt-10 py-8 border-y border-border">
				<CommentForm onSubmit={(data) => console.log(data)} />
			</div>

			{isAuthenticated && <Comments comment_list={chat} />}
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

export async function getStaticProps({ params }) {
	let recipe;
	try {
		const res = await api.get(`${ENDPOINT_RECIPE_DETAIL}${params?.slug}/`);
		recipe = res?.data;
	} catch {}
	return {
		props: { recipe },
		revalidate: 5,
	};
}

export async function getStaticPaths() {
	let paths;
	try {
		const res = await api.get(ENDPOINT_RECIPE_DETAIL);
		paths = res?.data?.results.map((item) => ({
			params: {
				slug: item.slug,
			},
		}));
	} catch {}

	return {
		paths,
		fallback: 'blocking',
	};
}
