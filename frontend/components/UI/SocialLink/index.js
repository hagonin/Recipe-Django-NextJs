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
	size = '13',
	color = 'white',
	hover = 'opacity-80',
	top = '0',
	spacing = '12',
}) {
	return (
		<div className="flex">
			{socialList.map((item) => (
				<a
					key={item.id}
					href={item.href}
					className={`text-[${size}px] text-${color} px-[${spacing}px] cursor-pointer hover:${hover} block mt-[${top}px]`}
				>
					{item.icon}
				</a>
			))}
		</div>
	);
}

export default SocialLink;
