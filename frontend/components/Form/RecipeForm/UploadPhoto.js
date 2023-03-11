import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, InputField } from '../FormControl';
import Image from './Image';

function UploadPhoto({ onSubmit, recipe }) {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		setValue,
	} = useForm({
		defaultValues: {
			upload_photo: {
				image_url: null,
				caption: null,
			},
		},
	});
	const handleChoosePhoto = (file) => {
		setValue('upload_photo.image_url', file);
	};

	const createFormData = ({ upload_photo }) => {
		const { image_url, caption } = upload_photo;
		if (image_url) {
			const form = new FormData();

			form.append('image', image_url, image_url.name);
			form.append('caption', caption);
			form.append('recipe', recipe);
			return onSubmit(form);
		} else {
			toast.error('Choose photo to upload.');
		}
	};
	return (
		<div>
			<Form
				onSubmit={handleSubmit(createFormData)}
				className="md:w-1/3 mx-auto"
			>
				<Image handleChooseImg={handleChoosePhoto} />
				<div className="flex flex-col items-center">
					<InputField
						type="text"
						name="upload_photo.caption"
						register={register}
						label="Caption (optional)"
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="mt-5 primary w-full"
					>
						{isSubmitting && <Loader type="submitting" />}
						Upload Photo
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default UploadPhoto;
