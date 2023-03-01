import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, InputField } from '../FormControl';
import Image from './Image';

function UploadPhoto({ onSubmit, recipe }) {
	const handleChoosePhoto = (file) => {
		setValue('upload_photo.image_url', file);
	};
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

	const createFormData = ({ upload_photo }) => {
		const { image_url, caption } = upload_photo;
		if (image_url) {
			const form = new FormData();

			form.append('image', image_url, image_url.name);
			form.append('caption', caption);
			form.append('recipe', recipe);
			return onSubmit(form);
		} else {
			toast.error('Choose photo to upload.')
		}
	};
	return (
		<div>
			<Form
				onSubmit={handleSubmit(createFormData)}
				className="!flex-row gap-6"
			>
				<Image handleChooseImg={handleChoosePhoto} />
				<div>
					<InputField
						type="text"
						name="upload_photo.caption"
						register={register}
						label="Caption"
					/>
					<Button
						type="submit"
						disabled={isSubmitting}
						className="mt-5 primary"
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
