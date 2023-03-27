import { AiFillInstagram } from 'react-icons/ai';
import {
	FaInstagram,
	FaFacebookF,
	FaPinterestP,
	FaTwitter,
	FaLinkedin,
} from 'react-icons/fa';
import Tooltip from '../Tooltip';

function SocialLink({
	socialList = [
		{
			id: 1,
			name: 'Facebook',
			href: 'https://www.facebook.com/',
			icon: <FaFacebookF />,
		},
		{
			id: 2,
			name: 'Instagram',
			href: 'https://www.instagram.com/',
			icon: <AiFillInstagram />,
		},
		{
			id: 3,
			name: 'Pinterest',
			href: 'https://www.pinterest.co.uk/',
			icon: <FaPinterestP />,
		},
		{
			id: 4,
			name: 'Twitter',
			href: 'https://twitter.com/',
			icon: <FaTwitter />,
		},
		{
			id: 5,
			name: 'Linkedin',
			href: 'https://www.linkedin.com/',
			icon: <FaLinkedin />,
		},
	],
	color,
	center,
	hasLabel,
}) {
	return (
		<div className={`flex flex-wrap gap-4 ${center && 'justify-center'}`}>
			{socialList.map((item) => (
				<Tooltip content={item.name} key={item.id}>
					<a
						href={item.href}
						className={`flex items-center px-1 transition-all cursor-pointer hover:opacity-70 ${
							color ? `text-${color}` : 'text-white'
						} cursor-pointer`}
					>
						{item.icon}
						{hasLabel && (
							<span className=" uppercase text-sm ml-2 md:block hidden relative top-[1px]">
								{item.name}
							</span>
						)}
					</a>
				</Tooltip>
			))}
		</div>
	);
}

export default SocialLink;
