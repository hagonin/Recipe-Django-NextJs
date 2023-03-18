import Link from 'next/link';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import { TitlePrimary } from '@components/UI/Title';
import { meta } from '@utils/constants';

function About(props) {
	const { isAuthenticated } = useAuthContext();
	return (
		<div>
			<TitlePrimary title="About" />
			<SubTitle title="Who we are ?" />
			<p className="mt-3">{meta.about.title}</p>
			<Img
				src="https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/about_page_1.jpg"
				alt="about"
				className="my-5"
			/>
			<SubTitle title="Above all, we are:" />

			<ul className="mt-3 text-base list-disc">
				{meta.about.list.map(({ key, content }) => (
					<li>
						<span className="font-bold text-red3 mr-2">{key}</span>
						{content}
					</li>
				))}
			</ul>
			<SubTitle title="Work with us" />
			<p className="mt-3">
				{meta.about.message}
				{!isAuthenticated && (
					<Link
						href="/signup"
						className="text-lg text-primary underline ml-2"
					>
						Register here
					</Link>
				)}
			</p>
		</div>
	);
}

const SubTitle = ({ title }) => <h3 className="mt-7 font-serif">{title}</h3>;

export default About;
About.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
