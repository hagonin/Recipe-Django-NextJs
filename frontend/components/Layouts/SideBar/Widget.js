import SearchForm from '@components/Form/SearchForm';
import SubscribeForm from '@components/Form/SubscribeForm';
import SubScribe from '@components/Subscribe';
import Button from '@components/UI/Button';
import SocialLink from '@components/UI/SocialLink';
import Image from 'next/image';
import Link from 'next/link';
import { BsChatLeftDots, BsInstagram, BsPrinter } from 'react-icons/bs';

function Widget() {
	const userInfo = {
		name: 'User Name',
		avatar: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2020/03/allure_post_12.jpg',
		bio: ' Sed pellentesque nibh enim, quis euismod enim lacinia nec.Phasellus quam diam, semper in erat eu. Consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec.',
	};
	const picsRandom = [
		{
			id: 1,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/17.jpg',
		},
		{
			id: 2,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/20.jpg',
		},
		{
			id: 3,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/23.jpg',
		},
		{
			id: 4,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/17.jpg',
		},
		{
			id: 5,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/20.jpg',
		},
		{
			id: 6,
			cover: 'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/04/23.jpg',
		},
	];

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
			<CommonSection
				title="About me"
				center
			>
				<Image
					src={userInfo.avatar}
					alt="avatar"
					fill
					className="!relative "
				/>
				<span className="text-lg text-black mt-4 block">
					{userInfo.name}
				</span>
				<p className="text-center mt-1 mb-5 ">{userInfo.bio}</p>
				<SocialLink
					color="second"
					center
				/>
			</CommonSection>
			<CommonSection title="Collection pictures">
				<div className="grid grid-cols-3 gap-2">
					{picsRandom.map((pic) => (
						<Link
							key={pic.id}
							className="relative"
							href={`/recipes/${[pic.id]}`}
						>
							<Image
								src={pic.cover}
								alt="pic"
								fill
								className="!relative"
							/>
						</Link>
					))}
				</div>
				<Button
					className="lg absolute top-1/2 left-1/2 -translate-x-1/2 min-w-[270px]"
					icon={{ left: <BsInstagram /> }}
				>
					Follow on Instagram
				</Button>
			</CommonSection>
			<CommonSection title="LATEST POSTS">
				Lastest Post here!
			</CommonSection>
			<CommonSection title="Banner">
				<Image
					fill
					src={bannerImg}
					alt="banner"
					className="!relative"
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

const CommonSection = ({ title, children }) => (
	<div className="border border-border rounded px-5 pt-5 pb-7 relative">
		<div className="text-center">
			<h4 className="inline-block leading-6 uppercase border-b border-second mb-6 ">
				{title}
			</h4>
		</div>
		{children}
	</div>
);
export default Widget;
