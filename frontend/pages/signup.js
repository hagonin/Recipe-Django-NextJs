import { useState } from 'react';
import { useRouter } from 'next/router';

import { GrStatusGood } from 'react-icons/gr';

import SignUpForm from '@components/Form/SignUpForm';
import Img from '@components/UI/Image';

function SignUp() {
	const router = useRouter();
	const [error, setError] = useState(false);

	const onSubmit = (data) => {
		const fetchFake = new Promise((resolve, reject) =>
			setTimeout(() => {
				resolve({ status: 'Success', data: data });
				// reject('Registration failed. Please try again.');
			}, 2000)
		);
		return fetchFake
			.then((data) => {
				console.log(data);
				router.push('user/username.js');
			})
			.catch((error) => {
				setError(error);
			});
	};

	return (
		<div className="bg-primaryLight">
			<div className="container py-14 grid md:grid-cols-2 grid-cols-1  md:gap-8 ">
				<div className="flex flex-col items-center justify-center">
					{error && <span>{error}</span>}
					<Img
						alt="login"
						src="/static/images/girl-cooking-2.png"
						className="w-full h-[300px] mb-10"
					/>
					<h1>Create An Account</h1>
					<h2>What you will get?</h2>
					<ul className="mt-10">
						<li className="flex items-center">
							<GrStatusGood className="mr-2" /> Manage your
							recipes by the easy way
						</li>
						<li className="flex items-center">
							<GrStatusGood className="mr-2" />
							Discover a lot of others recipes and get new ones
						</li>
						<li className="flex items-center">
							<GrStatusGood className="mr-2" />
							Interact with other users and discuss about their
							recipes
						</li>
						<li className="flex items-center">
							<GrStatusGood className="mr-2" />
							Help others get recipes to serve their daily lives,
							improve nutrition and health
						</li>
					</ul>
				</div>
				<SignUpForm onSubmit={onSubmit} />
			</div>
		</div>
	);
}

export default SignUp;
