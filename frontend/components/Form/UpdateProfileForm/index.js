import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
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
		formState: { defaultValues, isSubmitting },
	} = useForm({
		defaultValues: {
			'profile.username': username,
			'profile.last_name': last_name,
			'profile.first_name': first_name,
			'profile.bio': bio,
			'profile.avatar': { preview: avatar, file: avatar },
		},
	});

	const [image, setImage] = useState(null);

	const handleChangeAvatar = (e) => {
		const file = e.target.files[0];
		console.log(file);
		const blob = file && URL.createObjectURL(file);
		setImage({ preview: blob, file: file?.name });
	};

	// const encodeImage = (file) => {
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(file);
	// 	reader.onloadend = () => {
	// 		console.log(reader.result);
	// 	};
	// };
	const handleReset = () => {
		reset({ ...defaultValues });
	};

	useEffect(() => {
		image && setValue('profile.avatar', image);
		return () => {
			URL.revokeObjectURL(image?.preview);
		};
	}, [image]);

	const handleBeforeSubmit = ({ profile }) => {
		const { avatar, ...rest } = profile;
		// console.log(avatar.file);
		return onSubmit({ avatar: avatar.file, ...rest });
	};

	return (
		<form
			className="grid md:grid-cols-12 grid-cols-1 md:gap-4 lg:gap-6 gap-6"
			noValidate={true}
			onSubmit={handleSubmit(handleBeforeSubmit)}
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
						{isSubmitting && <Loader type="submitting" />}
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
