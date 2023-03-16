import SearchForm from '@components/Form/SearchForm';
import SubscribeForm from '@components/Form/SubscribeForm';
import Img from '@components/UI/Image';
import CollectionPics from './CollectionPics';
import CommonSection from './CommonSection';
import Tags from './Tags';
import LastPost from '../../../Recipe/LastestRecipes';
import { useRouter } from 'next/router';
import { useRecipeContext } from '@context/recipe-context';
import Link from 'next/link';
import Loader from '@components/UI/Loader';

function Widget() {
	const router = useRouter();
	const { photoRandom } = useRecipeContext();
	const onSubmitSearch = (data) =>
		router.push({
			pathname: '/search',
			query: data,
		});

	return (
		<section className="flex flex-col gap-y-10">
			<CommonSection title="About Us">
				<p className="text-center ">
					<span className="font-bold text-primary">HomeCook</span> is
					on a simple premise: home cooks are the best cooks. Special
					recipes are at the heart of so many of our warmest
					memories—families gathered around holiday tables or
					celebrating special occasions with friends.
				</p>
			</CommonSection>
			<CollectionPics />
			<CommonSection title="LATEST POSTS">
				<LastPost />
			</CommonSection>
			<CommonSection title="Banner">
				{photoRandom ? (
					<Link href={`/recipes/${photoRandom?.slug}`}>
						<Img
							src={photoRandom?.src}
							alt="banner"
							className="h-[300px]"
							cover
						/>
					</Link>
				) : (
					<Loader type="square" />
				)}
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
