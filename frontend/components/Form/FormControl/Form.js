import { useAuthContext } from '@context/auth-context';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

function Form({ children, onSubmit, initValues }) {
	const {
		handleSubmit,
		formState: {
			errors: errorForm,
			isSubmitSuccessful,
			isSubmitting,
			isValid,
		},
		setError,
		reset,
		...rest
	} = useForm({ defaultValues: initValues || {} });
	const { errors } = useAuthContext();

	useEffect(() => {
		isValid && reset();
	}, [isSubmitSuccessful]);

	useEffect(() => {
		errors &&
			Object.keys(errors).forEach((key) => {
				setError(key, {
					type: 'custom',
					message: errors[key][0],
				});
			});
	}, [errors]);

	return (
		<FormProvider
			errors={errorForm}
			isSubmitting={isSubmitting}
			reset={reset}
			{...rest}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
				noValidate={true}
			>
				{typeof children === 'function'
					? children({ errors, isSubmitting, reset, ...rest })
					: children}
			</form>
		</FormProvider>
	);
}

export default Form;
