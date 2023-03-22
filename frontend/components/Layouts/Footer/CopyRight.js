import Link from 'next/link';

function CopyRight() {
	return (
		<div className="bg-third">
			<div className=" container flex md:flex-row flex-col gap-1 items-center md:justify-between justify-center  h-16 max-md:py-10">
				<div className="flex gap-4 text-base">
					<Link
						href="/"
						className="hover:text-primary"
					>
						Privacy
					</Link>
					<Link
						href="/"
						className="hover:text-primary"
					>
						Cookie Policy
					</Link>
					<Link
						href="/"
						className="hover:text-primary"
					>
						Contact
					</Link>
				</div>
				<span className='text-base'>© 2023. HomeCook. All rights reserved.</span>
			</div>
		</div>
	);
}

export default CopyRight;
