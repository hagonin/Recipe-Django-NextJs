import Link from 'next/link';
import { Form } from 'react-final-form';
import Button from '../UI/Button';
import Img from '../UI/Image';
import InputField from './InputField';
import { email, required } from './Validate';

function LoginForm({ handleSubmit }) {
	const onSubmit = (values) => {
		handleSubmit(values);
	};
	return (
		<div className="bg-white  rounded-xl pt-6 pb-9 px-8  border my-10 md:shadow-xl">
			<div className="flex justify-center items-center">
				<h1 className="text-center">Login</h1>
				<Img
					alt="login_icon"
					src="/static/images/login.png"
					className="md:w-20 md:h-20 w-16 h-16"
				/>
			</div>

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
							name="email"
							type="text"
							placeholder="Enter your email"
						/>

						<InputField
							name="password"
							type="password"
							placeholder="Enter your password"
						/>

						<div className="flex justify-between items-center  mb-7 mt-5 max-sm:flex-col">
							<InputField
								name="remember"
								type="checkbox"
								labelRight="Remember me"
							/>
							<Link
								href="/resetpassword"
								className="font-semibold hover:text-primary max-sm:mt-2"
							>
								Forgot Password?
							</Link>
						</div>

						<Button
							primary
							full
							size="lg"
							type="submit"
						>
							Login
						</Button>

						<p className="text-center mt-5">
							Create an account?
							<Link
								href="/signup"
								className="ml-2 underline font-semibold hover:text-primary "
							>
								Register
							</Link>
						</p>
					</form>
				)}
			</Form>
		</div>
	);
}

export default LoginForm;
