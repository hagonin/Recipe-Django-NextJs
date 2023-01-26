import Link from 'next/link';
import { Form } from 'react-final-form';
import Button from '../Button';
import Img from '../Image';
import InputField from './InputField';

function RegisterForm({ handleSubmit }) {
	const onSubmit = (values) => {
		handleSubmit(values);
	};
	return (
		<div className="bg-white  rounded-xl py-6 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center">
				<h1 className="text-center">Register</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-20 h-20"
				/>
			</div>
			<p className="text-center">
				Welcome. We are glad you are here.
			</p>

			<Form
				onSubmit={onSubmit}
				initialValues={{ Remember: false }}
				validate={(values) => {
					const error = {};

					if (!values.fullname) {
						error.fullname = 'Required name';
					}

					if (!values.email) {
						error.email = 'Required email';
					}

					if (!values.password) {
						error.password = 'Required password';
					}

					if (!values['confirm-password']) {
						error['confirm-password'] = 'Required confirm-password';
					}
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
							name="fullname"
							type="text"
							placeholder="Enter your full name"
						/>

						<InputField
							name="email"
							type="text"
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

						<InputField
							name="Remember"
							type="checkbox"
							labelRight="Remember me"
						/>

						<Button
							primary
							type="submit"
							full
							rounded
						>
							Create Account
						</Button>

						<p className="text-center">
							By clicking on <b>"Create account"</b> you are
							agreeing to the{' '}
							<span className="font-semibold text-primary">
								Terms of Service
							</span>{' '}
							and the{' '}
							<span className="font-semibold text-primary">
								Privacy Policy
							</span>
						</p>

						<p className="text-center mt-5">
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
