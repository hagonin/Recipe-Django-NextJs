import Link from 'next/link';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import { TitlePrimary } from '@components/UI/Title';

function About(props) {
	const { isAuthenticated } = useAuthContext();
	return (
		<div>
			<TitlePrimary title="About" />
			<SubTitle title="Who we are ?" />
			<p className="mt-3">
				Home cooks are our heroes—it's as simple as that.{' '}
				<span className="text-primaryDark">HomeCook</span> is a
				community built by and for kitchen experts: The cooks who will
				dedicate the weekend to a perfect beef bourguignon but love the
				simplicity of a slow-cooker rendition, too. The bakers who labor
				over a showstopping 9-layer cake but will just as happily doctor
				boxed brownies for a decadent weeknight dessert. The
				entertainers who just want a solid snack spread, without tons of
				dirty dishes at the end of the night. Most importantly,{' '}
				<span className="text-primaryDark">HomeCook</span> connects home
				cooks with their greatest sources of inspiration — other home
				cooks. We're the world's leading digital food brand, and that
				inspires us to do everything possible to keep our community
				connected. Sixty-million home cooks deserve no less.
			</p>
			<Img
				src="https://k7d2p7y5.stackpathcdn.com/cuisine-wp/wp-content/uploads/2017/03/about_page_1.jpg"
				alt="about"
				className="my-5"
			/>
			<SubTitle title="Above all, we are:" />

			<ul className="mt-3 text-base">
				<li>
					<span className="font-bold text-[#DF7857] ">Friendly</span> We love trading
					ideas and hanging out with fellow home cooks.
				</li>
				<li>
					<span className="font-bold text-[#DF7857] ">Supportive</span> Struggling
					with dinner inspo? We’re here to help!.
				</li>
				<li>
					<span className="font-bold text-[#DF7857] ">Creative</span> Cooking is an
					art. We like to experiment and express ourselves.{' '}
				</li>
				<li>
					<span className="font-bold text-[#DF7857] ">Approachable</span> We don't
					judge—all cooking levels and recipes are welcome.
				</li>
				<li>
					<span className="font-bold text-[#DF7857] ">Down-to-Earth</span> We love
					good food, period. It doesn’t need to be fussy to be great.
				</li>
				<li>
					<span className="font-bold text-[#DF7857] ">Fun Like you</span> , we enjoy
					friends, family, cooking, and having a good laugh.
				</li>
			</ul>
			<SubTitle title="Work with us" />
			<p className="mt-3">
				Join our team of enthusiastic editors, designers, programmers,
				recipe developers, and more as we build out the world's largest
				food site.
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
