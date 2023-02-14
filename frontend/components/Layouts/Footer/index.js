import SocialLink from '@components/UI/SocialLink';
import CopyRight from './CopyRight';
import LatestRecipes from '../../Recipe/LatestRecipes';
import SocialLinkBar from './SocialLinkBar';
import WebInfo from './WebInfo';
import CollectionPics from '../SideBar/Widget/CollectionPics';

function Footer() {
	return (
		<footer>
			<CollectionPics isFooter />
			<div className="bg-third">
				<div className="container grid md:grid-cols-12 gap-10 py-10">
					<WebInfo />
					<LatestRecipes />
				</div>
			</div>
			<SocialLinkBar />
			<CopyRight />
		</footer>
	);
}

export default Footer;
