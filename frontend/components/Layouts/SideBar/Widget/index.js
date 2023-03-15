import SearchForm from '@components/Form/SearchForm';
import SubscribeForm from '@components/Form/SubscribeForm';
import Img from '@components/UI/Image';
import CollectionPics from './CollectionPics';
import CommonSection from './CommonSection';
import Tags from './Tags';
import LastPost from '../../../Recipe/LastestRecipes';
import { useRouter } from 'next/router';

function Widget() {
	const router = useRouter();

	const bannerImg =
		'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/06/promo_2_2item.jpg';

	const onSubmitSearch = (data) =>
		router.push({
			pathname: '/search',
			query: data,
		});
	console.log(router.pathname);

	return (
		<section className="flex flex-col gap-y-10">
			<CommonSection title="About Us">
				<p className="text-justify ">
					<span className="font-bold text-primary">HomeCook</span> is
					on a simple premise: home cooks are the best cooks. Special
					recipes are at the heart of so many of our warmest
					memories—families gathered around holiday tables or
					celebrating special occasions with friends. Even
					neighborhood potlucks, impromptu cookouts and simple
					weeknight dinners are made better by sharing from-scratch
					dishes made with love.
				</p>
			</CommonSection>
			<CollectionPics />
			<CommonSection title="LATEST POSTS">
				<LastPost />
			</CommonSection>
			<CommonSection title="Banner">
				<Img
					src={bannerImg}
					alt="banner"
					className="h-[300px]"
					cover
				/>
			</CommonSection>
			<CommonSection title="newsletter">
				<span className="block text-center mb-4">
					Subscribe to receive new recipes straight to your inbox!
				</span>
				<SubscribeForm secondary />
			</CommonSection>
			<CommonSection title="tags">
				<Tags />
			</CommonSection>
			<CommonSection title="search">
				<SearchForm
					secondary
					onSubmit={onSubmitSearch}
				/>
			</CommonSection>
		</section>
	);
}

export default Widget;
