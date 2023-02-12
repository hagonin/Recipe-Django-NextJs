import SocialLink from '@components/UI/SocialLink';
import CopyRight from './CopyRight';
import LatestRecipes from '../../Recipe/LatestRecipes';
import SocialLinkBar from './SocialLinkBar';
import WebInfo from './WebInfo';

function Footer() {
	return (
		<footer>
			<div>Instagram</div>
			<div className="bg-primaryLight">
				<div className="container grid md:grid-cols-12 gap-6 py-10">
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
