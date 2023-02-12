import Link from 'next/link';
import { BsInstagram } from 'react-icons/bs';

import SearchForm from '@components/Form/SearchForm';
import SubscribeForm from '@components/Form/SubscribeForm';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import CollectionPics from './Section/CollectionPics';
import CommonSection from './Section/CommonSection';
import UserSection from './Section/UserSection';

function Widget() {
	const userInfo = {
		name: 'User Name',
		avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2020/03/allure_post_12.jpg',
		bio: ' Sed pellentesque nibh enim, quis euismod enim lacinia nec.Phasellus quam diam, semper in erat eu. Consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec.',
	};
	

	const bannerImg =
		'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/06/promo_2_2item.jpg';

	const tags = [
		{
			id: 1,
			name: 'blueberry',
		},
		{
			id: 2,
			name: 'breakfast',
		},
		{
			id: 3,
			name: 'chocolate',
		},
		{
			id: 4,
			name: 'cupcake',
		},
		{
			id: 5,
			name: 'blueberry',
		},
		{
			id: 6,
			name: 'breakfast',
		},
		{
			id: 7,
			name: 'chocolate',
		},
		{
			id: 8,
			name: 'cupcake',
		},
	];

	
	return (
		<section className="flex flex-col gap-y-10">
			<UserSection {...userInfo} />
			<CollectionPics/>
			<CommonSection title="LATEST POSTS">
				Lastest Post here!
			</CommonSection>
			<CommonSection title="Banner">
				<Img
					src={bannerImg}
					alt="banner"
				/>
			</CommonSection>
			<CommonSection title="newsletter">
				<span className="block text-center mb-4">
					Subscribe to receive new recipes straight to your inbox!
				</span>
				<SubscribeForm secondary />
			</CommonSection>
			<CommonSection title="tags">
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Button
							key={tag.id}
							type="link"
							href={`/recipes/category/${tag.name}`}
							className="tag"
						>
							{tag.name}
						</Button>
					))}
				</div>
			</CommonSection>
			<CommonSection title="search">
				<SearchForm
					secondary
					onSubmit={(data) => {
						console.log(data);
					}}
				/>
			</CommonSection>
		</section>
	);
}

export default Widget;
