import Link from 'next/link';

import WidgetLayout from '@components/Layouts/WidgetLayout';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';
import { TitlePrimary } from '@components/UI/Title';
import { images, meta } from '@utils/constants';

function About(props) {
	const { isAuthenticated } = useAuthContext();
	return (
		<div className="md:w-[80%] md:ml-[10%] relative">
			<TitlePrimary title="About Us" />
			<p className="my-3">
				<span className="font-semibold mr-1">Welcome to HomeCook,</span>
				{meta.about.history}
			</p>
			<p className="text-justify pb-2">
				Are you passionate about food and love to share your culinary creations
				with others? Do you enjoy trying out new recipes and experimenting with
				different ingredients?
			</p>
			<p className="text-justify pb-2">
				Then you've come to the right place!
				<strong className="text-red2 ml-1">HomeCook</strong> is a community of
				home cooks just like you, who are interested in connecting with others
				who share their passion for cooking. Whether you're a seasoned pro or
				just starting out in the kitchen, we welcome all levels of experience
				and all types of cuisine.
			</p>
			<p className="text-justify pb-2">
				Our website features a wealth of resources to help you on your culinary
				journey, including recipes, cooking tips, and articles on the latest
				trends in food and cooking. You can also connect with other home cooks
				from around the world, share your own recipes and tips, and participate
				in fun challenges and contests.
			</p>
			<p className="text-justify pb-2">
				We're always looking for enthusiastic contributors to join our team of
				editors, designers, programmers, recipe developers, and more. If you're
				interested in getting involved or have any questions about our
				community, please don't hesitate to contact us. We'd love to hear from
				you! Thank you for your interest in
				<strong className="text-red2 ml-1">HomeCook</strong>. We look forward to
				cooking with you!
			</p>
			<SubTitle title="Who we are ?" />
			<p className="my-3 text-justify">
				Home cooks are the unsung heroes of the kitchen, and
				<strong className="text-red2 mx-1">HomeCook</strong> is a community
				built by and for these culinary experts.
			</p>
			<p className="text-justify pb-2">
				From those who take the time to perfect a beef bourguignon on the
				weekend to those who prefer the ease of a slow-cooker recipe, HomeCook
				is a place for all types of home cooks. Whether you're a baker who
				spends hours creating a showstopping cake or someone who simply jazzes
				up boxed brownies for a quick dessert,
				<strong className="text-red2 ml-1">HomeCook</strong> celebrates your
				efforts.
			</p>
			<p className="text-justify pb-2">
				With a focus on connecting home cooks with each other,
				<strong className="text-red2 mx-1">HomeCook</strong>
				is the world's leading digital food brand. Our mission is to keep our
				community of over 60 million home cooks engaged, inspired, and
				connected. By bringing together home cooks from all walks of life,
				<strong className="text-red2 mx-1">HomeCook</strong>aims to foster a
				sense of community and shared passion for cooking. Together, we can
				learn from each other, share tips and tricks, and support one another on
				our culinary journeys.
			</p>
			<Img src={images.about} alt="about" className="mt-4 w-full h-[300px]" />
			<SubTitle title="We are:" />

			<ul className="mt-3 text-base list-disc marker:text-red3">
				{meta.about.list.map(({ key, content }, index) => (
					<li key={index}>
						<span className="font-semibold text-red3 mr-2">{key}</span>
						{content}
					</li>
				))}
			</ul>
			<SubTitle title="Work with us" />
			<p className="mt-3 text-justify">
				{meta.about.message}
				<Link
					href="/signup"
					className="mx-1 text-primary hover:text-primary hover:italic hover:underline"
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
