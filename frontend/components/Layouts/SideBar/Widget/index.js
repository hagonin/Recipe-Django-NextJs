import { useAuthContext } from '@context/auth-context';
import SearchForm from '@components/Form/SearchForm';
import SubscribeForm from '@components/Form/SubscribeForm';
import Img from '@components/UI/Image';
import CollectionPics from './CollectionPics';
import CommonSection from './CommonSection';
import UserSection from './UserSection';
import Loader from '@components/UI/Loader';
import Tags from './Tags';
import LastPost from '../../../Recipe/LastestRecipes';
import { useRouter } from 'next/router';

function Widget() {
	const { isAuthenticated, loading, user } = useAuthContext();
	const router = useRouter();
	const bannerImg =
		'https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/06/promo_2_2item.jpg';

	const onSubmitSearch = (data) =>
		router.push({
			pathname: '/search',
			query: data,
		});
	return (
		<section className="flex flex-col gap-y-10">
			{loading ? (
				<CommonSection>
					<Loader />
				</CommonSection>
			) : isAuthenticated ? (
				<UserSection
					name={user.username}
					bio={user.bio}
					avatar={user.avatar}
				/>
			) : null}
			<CollectionPics />
			<CommonSection title="LATEST POSTS">
				<LastPost />
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
