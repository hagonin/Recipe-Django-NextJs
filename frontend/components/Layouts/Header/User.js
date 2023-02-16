import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { images } from '@utils/constants';

import Tippy from '@tippyjs/react/headless';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useAuthContext } from '@context/auth-context';

function User({ username, email, avatar = images.defaultAvatar }) {
	const { logout } = useAuthContext();
	const [visible, setVisible] = useState(false);
	const toggle = () => setVisible(!visible);
	const hide = () => setVisible(false);

	return (
		<div className="relative flex items-center">
			<Tippy
				render={(attrs) => (
					<div
						{...attrs}
						className="absolute z-200 top-[calc(100%+3px)] right-0 pt-5 pb-2 min-w-[250px] bg-white shadow-lg border-t-2 border-primary text-left"
					>
						<h3 className="uppercase mb-4 px-5">Account</h3>
						<div className="flex items-center px-5">
							<Image
								src={avatar}
								alt="avatar"
								width={58}
								height={58}
								priority={true}
								styles={{
									objectFit: 'contain',
									backgroundColor: 'blue',
								}}
							/>
							<div className="ml-3 flex flex-col">
								<span className="text-black font-bold">
									{username}
								</span>
								<span className="text-sm text-second">
									{email}
								</span>
							</div>
						</div>
						<div className="text-black mt-3">
							<Link
								href={`/user/${username}`}
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
								href="/recipes/addnewrecipe"
								className="block text-left w-full py-2 px-5 hover:bg-[rgba(0,0,0,0.05)] mb-2"
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
				visible={visible}
				onClickOutside={hide}
				interactive={true}
			>
				<button
					className=" rounded-full bg-grey border outline-none border-border transition-all  hover:shadow-[0px_0px_0px_4px_rgba(255,255,255,0.15)]"
					onClick={toggle}
				>
					<Image
						src="/static/images/user.png"
						alt="avatar"
						width={30}
						height={30}
						priority={true}
						styles={{
							objectFit: 'contain',
							backgroundColor: 'blue',
						}}
					/>
				</button>
			</Tippy>
		</div>
	);
}

export default User;
