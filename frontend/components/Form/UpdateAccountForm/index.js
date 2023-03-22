import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { useAuthContext } from '@context/auth-context';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { Form, InputField, TextAreaField } from '../FormControl';
import PreviewImg from './Preview';

function UpdateProfileForm({
	username,
	first_name,
	last_name,
	bio,
	avatar,
	onSubmit,
}) {
	const { errors, setErrors } = useAuthContext();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		setError,
		formState: { defaultValues, isSubmitting, errors: formError },
	} = useForm({
		defaultValues: {
			'account.username': username,
			'account.last_name': last_name,
			'account.first_name': first_name,
			'account.bio': bio,
			'account.avatar': { file: null, name: null },
		},
	});

	const handleReset = () => {
		reset({ ...defaultValues });
	};

	const createForm = ({ account }) => {
		const { avatar, bio, ...personal } = account;

		const formProfile = new FormData();
		formProfile.append('bio', bio);
		avatar.file && formProfile.append('avatar', avatar.file, avatar.name);

		return onSubmit({ personal, formProfile });
	};

	const handleOnChangeImg = (e) => {
		const [file] = e.target.files;
		setValue('account.avatar', {
			file: file,
			name: file.name,
		});
	};

	useEffect(() => {
		errors?.account?.username &&
			setError('account.username', {
				type: 'custom',
				message: errors?.account?.username,
			});
		errors?.account?.first_name &&
			setError('account.first_name', {
				type: 'custom',
				message: errors?.account?.first_name,
			});
	}, [errors]);

	useEffect(() => {
		return () => {
			setErrors(null);
		};
	}, []);

	return (
		<Form
			className="grid md:grid-cols-12 grid-cols-1 md:gap-4 lg:gap-6 gap-6 mt-16"
			onSubmit={handleSubmit(createForm)}
		>
			<div className="md:col-span-4 flex flex-col items-center ">
				<PreviewImg
					avatar={avatar}
					handleOnChangeImg={handleOnChangeImg}
				/>
				<input
					type="text"
					{...register('account.avatar')}
					className="invisible"
				/>
			</div>
			<div className="flex flex-col gap-4 md:col-span-8">
				<InputField
					label="First name"
					name="account.first_name"
					type="text"
					register={register}
					error={formError?.account?.first_name}
				/>
				<InputField
					label="Last name"
					name="account.last_name"
					type="text"
					register={register}
					error={formError?.account?.last_name}
				/>
				<InputField
					label="Username"
					name="account.username"
					type="text"
					register={register}
					error={formError?.account?.username}
					required
				/>

				<TextAreaField
					label="Bio"
					name="account.bio"
					type="text"
					register={register}
					rows={6}
					error={formError?.account?.bio}
				/>
				<div className="flex lg:gap-6 gap-4 mt-7 justify-end ">
					<Button
						className="lg cancle w-36"
						type="button"
						onClick={handleReset}
						disabled={isSubmitting}
					>
						Reset
					</Button>
					<Button
						type="submit"
						className="lg primary w-36"
						disabled={isSubmitting}
					>
						{isSubmitting && <Loader type="submitting" />}
						Save
					</Button>
				</div>
			</div>
		</Form>
	);
}

export default UpdateProfileForm;
