import WidgetLayout from '@components/Layouts/WidgetLayout';
import Img from '@components/UI/Image';
import SocialLink from '@components/UI/SocialLink';
import { TitlePrimary } from '@components/UI/Title';
import useRecipeBySlug from 'hook/useRecipeBySlug';
import { useRouter } from 'next/router';

function Author() {
	const router = useRouter();
	const { data } = useRecipeBySlug(router?.query?.slug);

	return (
		<div className="lg:w-2/3 md:w-4/5 mx-auto">
			<div className=""></div>
			<div className="top-full bottom-full bg-[#E8F0EF] rounded-md py-8 px-8 flex flex-col items-center gap-4">
				<Img
					src={data?.user?.profile?.avatar}
					alt={data?.user?.username}
					className="h-[200px] w-[200px] rounded-full mx-auto overflow-hidden "
					cover
				/>
				<span>{data?.user?.username}</span>
				<TitlePrimary
					title="About"
					center
				/>
				<p>{data?.user?.profile?.bio}</p>
				<SocialLink color="grey" />
			</div>
			<button
				className="flex items-center gap-2 underline hover:text-primary mt-2"
				onClick={() => router.push(`/recipes/${router?.query?.slug}`)}
			>
				Continue read the recipe
			</button>
		</div>
	);
}

export default Author;

Author.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
