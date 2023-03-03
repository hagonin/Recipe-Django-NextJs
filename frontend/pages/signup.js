import { GrStatusGood } from 'react-icons/gr';
import { images } from '@utils/constants';

import SignUpForm from '@components/Form/SignUpForm';
import Img from '@components/UI/Image';
import { useAuthContext } from '@context/auth-context';

function SignUp() {
	const { signup } = useAuthContext();

	return (
		<div className="bg-primaryLight select-none">
			<div className="container py-14 grid md:grid-cols-2 grid-cols-1  md:gap-8 ">
				<div className="flex flex-col items-center justify-center">
					<Img
						alt="login"
						src={images.signup}
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
				<SignUpForm onSubmit={signup} />
			</div>
		</div>
	);
}

export default SignUp;
