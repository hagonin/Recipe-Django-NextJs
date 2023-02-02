import {
	FaInstagram,
	FaFacebookF,
	FaPinterestP,
	FaTwitter,
	FaLinkedin,
} from 'react-icons/fa';

function SocialLink({
	socialList = [
		{
			id: 1,
			name: 'Facebook',
			href: 'https://vi-vn.facebook.com/',
			icon: <FaFacebookF />,
		},
		{
			id: 2,
			name: 'Instagram',
			href: 'https://vi-vn.facebook.com/',
			icon: <FaInstagram />,
		},
		{
			id: 3,
			name: 'PinterestP',
			href: 'https://vi-vn.facebook.com/',
			icon: <FaPinterestP />,
		},
		{
			id: 4,
			name: 'Twitter',
			href: 'https://vi-vn.facebook.com/',
			icon: <FaTwitter />,
		},
		{
			id: 5,
			name: 'Linkedin',
			href: 'https://vi-vn.facebook.com/',
			icon: <FaLinkedin />,
		},
	],
	color,
}) {
	return (
		<div className="flex flex-wrap gap-4">
			{socialList.map((item) => (
				<a
					key={item.id}
					href={item.href}
					className={`px-1 transition-all cursor-pointer hover:opacity-70 ${
						color ? `text-${color}` : 'text-white'
					}`}
				>
					{item.icon}
				</a>
			))}
		</div>
	);
}

export default SocialLink;
