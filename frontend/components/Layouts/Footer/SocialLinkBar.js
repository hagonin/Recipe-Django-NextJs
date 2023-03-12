import SocialLink from '@components/UI/SocialLink';

function SocialLinkBar() {
	return (
		<div className="bg-primary md:h-16 h-12 flex items-center justify-center">
			<SocialLink hasLabel />
		</div>
	);
}

export default SocialLinkBar;
