import { useState } from 'react';
import Link from 'next/link';

import { BsBoxArrowRight } from 'react-icons/bs';

import { images } from '@utils/constants';

import { useAuthContext } from '@context/auth-context';
import Img from '@components/UI/Image';

function User({ username, email, avatar = images.defaultAvatar }) {
	const { logout } = useAuthContext();
	const [visible, setVisible] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	return (
		<div
			className="relative flex items-center"
			onMouseEnter={show}
			onMouseLeave={hide}
		>
			<button className=" h-10 w-10 rounded-full border outline-none border-border transition-all  hover:shadow-[0px_0px_0px_4px_rgba(255,255,255,0.15)] overflow-hidden">
				<Img
					src={avatar || images.defaultAvatar}
					alt="avatar"
					cover
					className="h-full w-full"
				/>
			</button>
			{visible && (
				<div className="absolute z-[999] top-[calc(100%+6px)] right-0 pt-5 pb-1 min-w-[250px] bg-white shadow-lg border-t-2 border-primary text-left before:content-[''] before:absolute before:right-0 before:-top-7 before:h-10 before:bg-transparent before:w-20">
					<div className="flex items-center px-5 mb-5">
						<Img
							src={avatar || images.defaultAvatar}
							alt="avatar"
							className="h-20 w-20 rounded-full overflow-hidden"
							cover
						/>
						<div className="ml-3 flex flex-col">
							<span className="text-xl text-black font-semibold">
								{username}
							</span>
							<span className="text-second">{email}</span>
						</div>
					</div>
					<Separate />
					<div className="text-black">
						<Item
							label="Profile"
							href="/user/profile/"
						/>
						<Item
							label="Update Profile"
							href="/user/updateprofile"
						/>
						<Item
							label="Change Password"
							href="/user/changepassword"
						/>
						<Separate />
						<Item
							label="Add recipe"
							href="/user/recipe/add"
						/>
						<Item
							label="Wishlist"
							href="/user/profile"
						/>
						<Separate />
						<Item
							label="Log out"
							icon={<BsBoxArrowRight className="mr-2" />}
							onClick={logout}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

const Item = ({ label, href, icon, ...props }) => {
	const Comp = href ? Link : 'button';

	return (
		<Comp
			href={href}
			className={`text-lg block py-2 px-5 hover:bg-[rgba(0,0,0,0.05)] flex items-center gap-2 hover:text-primaryDark w-full`}
			{...props}
		>
			{icon && icon}
			{label}
		</Comp>
	);
};

const Separate = () => <span className="block border-t my-1"></span>;
export default User;
