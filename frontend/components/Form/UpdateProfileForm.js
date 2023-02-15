import { useForm } from 'react-hook-form';
import { InputField, TextAreaField } from './FormControl';

function UpdateProfileForm() {
	const { register } = useForm();
	return (
		<form className="grid md:grid-cols-12 grid-cols-1 lg:gap-6 md:gap-4">
			<div className="col-span-4">
				<InputField
					label="Avatar"
					name="profile.avatar"
					type="text"
					register={register}
				/>
			</div>
			<div className="flex flex-col gap-4 col-span-8">
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
				<InputField
					label="First Name"
					name="profile.first_name"
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
			</div>
		</form>
	);
}

export default UpdateProfileForm;
