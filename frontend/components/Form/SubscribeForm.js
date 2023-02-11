import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';
import { InputField } from './FormControl';

function SubscribeForm() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<form
			className="flex md:gap-4 gap-2 max-md:flex-col max-md:w-full max-md:mt-3"
			noValidate={true}
			onSubmit={handleSubmit(onSubmit)}
		>
			<InputField
				name="subscribe"
				placeholder="Your email address"
				register={register}
				type="email"
			/>
			<Button
				className="primary lgSize !text-[0.9rem]"
				type="submit"
			>
				{isSubmitting ? <Loader type="submitting" /> : null}
				Subscribe
			</Button>
		</form>
	);
}

export default SubscribeForm;
