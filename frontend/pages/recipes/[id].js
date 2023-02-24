import api from '@services/axios';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import RelatedRecipe from '@components/Recipe/RelatedRecipe';
import SingRecipe from '@components/Recipe/SingleRecipe';
import Thumbnail from '@components/UI/Slider/Thumbnail';
import SubscribeSection from '@components/SubcribeSection';
import CommentForm from '@components/Form/CommentForm';
import CommentCard from '@components/Comment/CommentCard';
import Comments from '@components/Comment';

function Recipe() {
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

	// const { image_url, user, slug, ..._recipe } = recipe;
	const images = [
		{
			id: 1,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 2,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 3,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 4,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 5,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
		},
		{
			id: 6,
			caption: 'recipe 1',
			url: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/24.jpg',
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
	];
	const comment = {
		name: 'Thomas',
		avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/themes/cuisine/assets/img/cuisine_author.jpg',
		date: 'January 19, 2021',
		time: '3:15 pm',
		message:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
	};
	return (
		<>
			{/* <SingRecipe
				{..._recipe}
				cover={image_url}
				author={user}
				title={slug}
			/> */}
			<Thumbnail images={images} />
			<SubscribeSection />
			<RelatedRecipe recipes={relatedRecipes} />
			<Comments comment_list={chat} />

			<div className="mt-10 py-8 border-y border-border">
				<CommentForm onSubmit={(data) => console.log(data)} />
			</div>
		</>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;

// export async function getStaticProps({ params }) {
// 	const res = await api.get(`/recipe/recipe/${params.id}/`);
// 	const recipe = res.data;

// 	// get category and fetch related recipe here

// 	return {
// 		props: {},
// 	};
// }

// export async function getStaticPaths() {
// 	const res = await api.get('/recipe/recipe/');
// 	const paths = res.data.map((item) => ({
// 		params: {
// 			id: item.id.toString(),
// 		},
// 	}));
// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }
