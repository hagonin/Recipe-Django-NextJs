import Button from '@components/UI/Button';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField, TextAreaField } from '../FormControl';
import Avatar from './Avatar';

function UpdateProfileForm({
	username,
	first_name,
	last_name,
	bio,
	avatar,
	onSubmit,
}) {
	const {
		register,
		handleSubmit,
		setValue,
		control,
		reset,
		formState: { defaultValues },
	} = useForm({
		defaultValues: {
			'profile.username': username,
			'profile.last_name': last_name,
			'profile.first_name': first_name,
			'profile.bio': bio,
			'profile.avatar': avatar,
		},
	});

	const [avatarPreview, setAvatarPreview] = useState(null);

	const handleChangeAvatar = (e) => {
		const blob = URL.createObjectURL(e.target.files[0]);
		setAvatarPreview(blob);
	};

	const handleReset = () => {
		reset({ ...defaultValues });
	};

	useEffect(() => {
		avatarPreview && setValue('profile.avatar', avatarPreview);
		return () => {
			URL.revokeObjectURL(avatarPreview);
		};
	}, [avatarPreview]);

	return (
		<form
			className="grid md:grid-cols-12 grid-cols-1 md:gap-4 lg:gap-6 gap-6"
			noValidate={true}
			onSubmit={handleSubmit(({ profile }) => onSubmit({ ...profile }))}
		>
			<div className="md:col-span-4 flex flex-col items-center ">
				<Avatar
					control={control}
					name="profile.avatar"
					handleChangeAvatar={handleChangeAvatar}
				/>
			</div>
			<div className="flex flex-col gap-4 md:col-span-8">
				<InputField
					label="First Name"
					name="profile.first_name"
					type="text"
					register={register}
				/>
				<InputField
					label="Last Name"
					name="profile.last_name"
					type="text"
					register={register}
				/>
				<InputField
					label="User Name"
					name="profile.username"
					type="text"
					register={register}
				/>

				<TextAreaField
					label="Bio"
					name="profile.bio"
					type="text"
					register={register}
					rows={6}
				/>
				<div className="flex lg:gap-6 md:gap-4 max-md:flex-col mt-7 ">
					<Button
						type="submit"
						className="lg primary w-full"
					>
						Save
					</Button>
					<Button
						className="lg w-full reset"
						onClick={handleReset}
					>
						Reset
					</Button>
				</div>
			</div>
		</form>
	);
}

export default UpdateProfileForm;
