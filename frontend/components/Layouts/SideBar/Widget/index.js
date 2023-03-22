import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRecipeContext } from '@context/recipe-context';
import { meta } from '@utils/constants';

import Loader from '@components/UI/Loader';
import SearchForm from '@components/Form/SearchForm';
import SubscribeForm from '@components/Form/SubscribeForm';
import Img from '@components/UI/Image';
import CollectionPics from './CollectionPics';
import CommonSection from './CommonSection';
import Tags from './Tags';
import LastPost from '../../../Recipe/LastestRecipes';

function Widget() {
	const router = useRouter();
	const { photoRandom } = useRecipeContext();
	const onSubmitSearch = (data) =>
		router.push({
			pathname: '/search',
			query: data,
		});

	return (
		<section className="flex flex-col lg:gap-y-8 md:gap-y-6 gap-y-4">
			<CommonSection title="About Us">
				<p className="text-center ">
					<span className="font-bold text-primary">HomeCook</span>
					{meta.introWeb}
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
							className="lg:h-[300px] md:h-44 h-[300px]"
							cover
						/>
					</Link>
				) : (
					<Loader type="square" />
				)}
			</CommonSection>
			<CommonSection title="newsletter">
				<span className="block md:text-base text-xbase text-center mb-3">
					Subscribe to receive new recipes straight to your inbox!
				</span>
				<SubscribeForm third />
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
