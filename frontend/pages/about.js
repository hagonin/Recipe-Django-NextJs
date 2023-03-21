import Link from 'next/link';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import { TitlePrimary } from '@components/UI/Title';
import { meta } from '@utils/constants';

function About(props) {
	const { isAuthenticated } = useAuthContext();
	return (
		<div className="w-[80%] ml-[10%]">
			<TitlePrimary title="About" />
			<p className="mt-3 text-justify">
				<span className="font-semibold mr-1">
					Welcome to HomeCook,
				</span>
				{meta.about.history}
			</p>
			<SubTitle title="Who we are ?" />
			<p className="mt-3 text-justify">
				Home cooks are the unsung heroes of the kitchen, and
				<span className="font-semibold mx-1">
					HomeCook
				</span>
				{meta.about.title}
			</p>
			<Img
				src="https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/about_page_1.jpg"
				alt="about"
				className="my-5"
			/>
			<SubTitle title="We are:" />

			<ul className="mt-3 lg:text-base text-xbase list-disc marker:text-red3">
				{meta.about.list.map(({ key, content }) => (
					<li>
						<span className="font-semibold text-red3 mr-2">
							{key}
						</span>
						{content}
					</li>
				))}
			</ul>
			<SubTitle title="Work with us" />
			<p className="mt-3 text-justify">
				{meta.about.message}
				<Link
					href="/signup"
					className="mx-1 underline hover:text-primary hover:italic"
				>
					food website
				</Link>
				in the world.
			</p>
		</div>
	);
}

const SubTitle = ({ title }) => <h3 className="mt-7 font-serif">{title}</h3>;

export default About;
About.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
