import Link from 'next/link';
import { Form } from 'react-final-form';
import Button from '../Button';
import Img from '../Image';
import InputField from './InputField';

function LoginForm({ handleSubmit }) {
	const onSubmit = (values) => {
		handleSubmit(values);
	};
	return (
		<div className="bg-white  rounded-xl py-6 px-8  border my-10 md:shadow-xl">
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
					if (!values.email) {
						error.email = 'Required email';
					}

					if (!values.Password) {
						error.Password = 'Required password';
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
							name="email"
							type="text"
							placeholder="Enter your email"
						/>

						<InputField
							name="Password"
							type="password"
							placeholder="Enter your password"
						/>

						<div className="flex justify-between items-center  mb-10 mt-5 max-sm:flex-col">
							<InputField
								name="Remember"
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
							type="submit"
							full
							rounded
						>
							Login
						</Button>

						<p className="text-center mt-5">
							Create an account?
							<Link
								href="/register"
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
