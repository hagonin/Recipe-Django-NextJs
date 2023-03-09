import SocialLink from '@components/UI/SocialLink';
import CopyRight from './CopyRight';
import LatestRecipes from '../../Recipe/LatestRecipes';
import SocialLinkBar from './SocialLinkBar';
import WebInfo from './WebInfo';
import CollectionPics from '../SideBar/Widget/CollectionPics';
import LastPost from '../SideBar/Widget/LastPost';

function Footer() {
	return (
		<footer>
			<CollectionPics isFooter />
			<div className="bg-third">
				<div className="container grid md:grid-cols-12 gap-10 py-10">
					<WebInfo />
					<div className="col-span-8">
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
