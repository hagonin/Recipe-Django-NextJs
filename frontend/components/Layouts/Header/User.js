import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
function User() {
	const [toggleOption, setToggleOption] = useState(false);
	const handleClick = () => {
		setToggleOption(!toggleOption);
	};
	return (
		<div className="relative flex items-center">
			<button
				className=" rounded-full bg-grey border outline-none border-border transition-all  hover:shadow-[0px_0px_0px_4px_rgba(255,255,255,0.15)]"
				onClick={handleClick}
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
			{toggleOption && (
				<div className="absolute z-10 top-[calc(100%+11px)] right-0 pt-5 pb-2 min-w-[250px] bg-white shadow-lg border-t-2 border-primary text-left">
					<h3 className="uppercase mb-4 px-5">Account</h3>
					<div className="flex items-center px-5">
						<Image
							src="/static/images/user.png"
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
								User Name
							</span>
							<span className="text-sm text-second">
								username@gmail.com
							</span>
						</div>
					</div>
					<div className="text-black mt-3">
						<Link
							href="/"
							className="block py-2 px-5 hover:bg-[rgba(0,0,0,0.05)]"
						>
							Manage Recipe
						</Link>
						<button className="text-left w-full py-2 px-5 hover:bg-[rgba(0,0,0,0.05)] mb-2">
							Add recipe
						</button>
						<span className="block border-t"></span>
						<button className="text-left w-full py-2 px-5 flex items-center hover:bg-[rgba(0,0,0,0.05)] mt-2">
							<BsBoxArrowRight className="mr-2" />
							Log out
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default User;
