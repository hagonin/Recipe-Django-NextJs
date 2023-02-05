import Link from 'next/link';
import { useFormContext } from 'react-hook-form';
import { Form, BtnForm, CheckboxField, InputField } from './FormControl';

import Img from '@components/UI/Image';

function SignUpForm({ onSubmit }) {
	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center ">
				<h1 className="text-center">Register</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center mb-10">
				Welcome. We are glad you are here.
			</p>

			<Form onSubmit={onSubmit}>
				<InputField
					name="username"
					type="text"
					placeholder="Enter your name"
				/>

				<InputField
					name="firstname"
					type="text"
					placeholder="Enter your first name"
				/>

				<InputField
					name="lastname"
					type="text"
					placeholder="Enter your last name"
				/>

				<InputField
					name="email"
					type="email"
					placeholder="Enter your email"
				/>

				<InputField
					name="password"
					type="password"
					placeholder="Enter your password"
				/>

				{/* <div className="my-2">
					<CheckboxField
						name="consent"
						isSingle={{
							label: 'By clicking "Create Account", I consent to the Privacy Policy.',
						}}
					/>
				</div> */}

				<BtnForm label="signup" />

				<p className="text-center mt-4">
					Have an account?
					<Link
						href="/login"
						className="ml-2 underline font-semibold hover:text-primary "
					>
						Login
					</Link>
				</p>
			</Form>
		</div>
	);
}

export default SignUpForm;
