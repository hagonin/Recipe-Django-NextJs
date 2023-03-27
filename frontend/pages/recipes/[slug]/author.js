import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';

import { satisfy } from '@utils/fonts';
import useRecipeBySlug from 'hook/useRecipeBySlug';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import { TitlePrimary } from '@components/UI/Title';

function Author() {
	const router = useRouter();
	const { data } = useRecipeBySlug(router?.query?.slug);

	return (
		<div className="lg:w-2/3 md:w-4/5 mx-auto">
			<TitlePrimary title="About author" center />
			<div className="bg-third top-full bottom-full rounded-md mt-5 md:py-8 md:px-8 px-4 py-6 flex flex-col items-center gap-4">
				{data && (
					<>
						<Img
							src={data?.user?.profile?.avatar}
							alt={data?.user?.username}
							className="h-[200px] w-[200px] rounded-full mx-auto overflow-hidden border "
							cover
						/>
						<span className={`${satisfy.className} text-[2rem] `}>
							{data?.user?.username}
						</span>
					</>
				)}
				<p>{data?.user?.profile?.bio}</p>
				<SocialLink color="grey" />
			</div>
			<button
				className="flex items-center gap-2 underline hover:text-primary mt-2"
				onClick={() => router.push(`/recipes/${router?.query?.slug}`)}
			>
				<BsArrowLeft />
				Back
			</button>
		</div>
	);
}

export default Author;

Author.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
