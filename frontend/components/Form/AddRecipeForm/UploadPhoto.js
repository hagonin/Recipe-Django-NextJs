import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';
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
				image: null,
				caption: null,
			},
		},
	});

	const createFormData = ({ upload_photo }) => {
		const { image, caption } = upload_photo;
		const form = new FormData();
		form.append('image', image, image.name);
		form.append('caption', caption);
		form.append('recipe', recipe);
		return form;
	};
	return (
		<div>
			<Form onSubmit={handleSubmit(createFormData)}>
				<Image handleChooseImg={handleChoosePhoto} />
				<InputField
					type="text"
					name="upload_photo.caption"
					register={register}
					label="Caption"
				/>
				<Button type="submit">
					{isSubmitting && <Loader type="submitting" />}
					Upload Photo
				</Button>
			</Form>
			<h1>Upload photo</h1>
		</div>
	);
}

export default UploadPhoto;
