import Link from 'next/link';
import { Form } from 'react-final-form';
import Button from '../UI/Button';
import Img from '../UI/Image';
import InputField from './InputField';
import { required } from './Validate';

function RegisterForm({ handleSubmit }) {
	const onSubmit = (values) => {
		handleSubmit(values);
	};
	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center">
				<h1 className="text-center">Register</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center">Welcome. We are glad you are here.</p>

			<Form
				onSubmit={onSubmit}
				initialValues={{ Remember: false }}
				validate={(values) => {
					const error = {};

					error.email = required(values.email, 'Required email');
					error.password = required(
						values.password,
						'Required password'
					);
					error['confirm-password'] = required(
						values['confirm-password'],
						'Required confirm password'
					);
					error.consent = required(
						values.consent,
						'Required consent'
					);

					return error;
				}}
				subscription={{ submitting: true, pristine: true }}
			>
				{({ handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 mt-12"
					>
						<InputField
							name="first"
							type="text"
							placeholder="Enter your first name"
						/>

						<InputField
							name="last"
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

						<InputField
							name="confirm-password"
							type="password"
							placeholder="Confirm Password"
						/>

						<div className="my-2">
							<InputField
								name="consent"
								type="checkbox"
								labelRight='By clicking "Create Account", I consent to the Privacy Policy.'
							/>
						</div>

						<Button
							primary
							type="submit"
							size="lg"
							full
						>
							Create Account
						</Button>

						<p className="text-center"></p>

						<p className="text-center mt-4">
							Have an account?
							<Link
								href="/login"
								className="ml-2 underline font-semibold hover:text-primary "
							>
								Login
							</Link>
						</p>
					</form>
				)}
			</Form>
		</div>
	);
}

export default RegisterForm;
