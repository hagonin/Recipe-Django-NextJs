import CopyRight from './CopyRight';
import SocialLinkBar from './SocialLinkBar';
import WebInfo from './WebInfo';
import CollectionPics from '../SideBar/Widget/CollectionPics';
import LastPost from '../../Recipe/LastestRecipes';
import Title from '@components/UI/Title';

function Footer() {
	return (
		<footer>
			<CollectionPics isFooter />
			<div className="bg-third">
				<div className="container grid md:grid-cols-12 gap-10 py-10">
					<WebInfo />
					<div className="md:col-span-8">
						<Title title="Lastest Post" />
						<LastPost
							isFooter
							number={4}
						/>
					</div>
				</div>
			</div>
			<SocialLinkBar />
			<CopyRight />
		</footer>
	);
}

export default Footer;
