import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { images } from '@utils/constants';

import Tippy from '@tippyjs/react/headless';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useAuthContext } from '@context/auth-context';
import Img from '@components/UI/Image';

function User({ username, email, avatar = images.defaultAvatar }) {
	const { logout } = useAuthContext();
	const [visible, setVisible] = useState(true);
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
					src={avatar}
					alt="avatar"
					cover
					className="h-full w-full"
				/>
			</button>
			{visible && (
				<div className="absolute z-[999] top-[calc(100%+6px)] right-0 pt-5  pb-2 min-w-[250px] bg-white shadow-lg border-t-2 border-primary text-left before:content-[''] before:absolute before:right-0 before:-top-7 before:h-10 before:bg-transparent before:w-20">
					<div className="flex items-center px-5">
						<Img
							src={avatar}
							alt="avatar"
							className="h-20 w-20 rounded-full overflow-hidden"
							cover
						/>
						<div className="ml-3 flex flex-col">
							<span className="text-xl text-black font-bold">
								{username}
							</span>
							<span className=" text-second">{email}</span>
						</div>
					</div>
					<div className="text-black mt-3">
						<Link
							href={`/user/profile/`}
							className="block py-2 px-5 hover:bg-[rgba(0,0,0,0.05)]"
						>
							Profile
						</Link>
						<Link
							href={`/user/updateprofile`}
							className="block py-2 px-5 hover:bg-[rgba(0,0,0,0.05)]"
						>
							Update Profile
						</Link>
						<Link
							href={`/user/changepassword`}
							className="block mb-2 py-2 px-5 hover:bg-[rgba(0,0,0,0.05)]"
						>
							Change Password
						</Link>
						<span className="block border-t"></span>
						<Link
							href="/user/recipe/add"
							className="mt-2 block text-left w-full py-2 px-5 hover:bg-[rgba(0,0,0,0.05)] mb-2 "
						>
							Add recipe
						</Link>
						<span className="block border-t"></span>
						<button
							className="text-left w-full py-2 px-5 flex items-center hover:bg-[rgba(0,0,0,0.05)] mt-2"
							onClick={logout}
						>
							<BsBoxArrowRight className="mr-2" />
							Log out
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

const Item = ({ label, href }) => (
	<Link
		href={href}
		className="block mb-2 py-2 px-5 hover:bg-[rgba(0,0,0,0.05)]"
	>
		{label}
	</Link>
);
export default User;
