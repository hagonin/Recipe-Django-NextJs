import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Loader from '@components/UI/Loader';
import { useRecipeContext } from '@context/recipe-context';
import {
	ENDPOINT_RECIPE_DETAIL,
	ENDPOINT_RECIPE_READ,
	images,
} from '@utils/constants';
import { getFileFromUrl } from '@utils/getFileFromUrl';
import useQuery from 'hook/useQuery';
import useRecipeBySlug from 'hook/useRecipeBySlug';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaLine } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdAddToPhotos, MdDelete, MdPhotoAlbum } from 'react-icons/md';
import ConfirmDelete from '../ConfirmDelete';
import { Form, InputField } from '../FormControl';

function UploadPhoto({ onSubmit, recipe }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { isSubmitting },
		setValue,
		getValues,
	} = useForm();

	const { fields, remove } = useFieldArray({
		control,
		name: 'upload_photo',
	});

	const router = useRouter();
	const inputFileRef = useRef();

	const { data, mutate, isLoading } = useRecipeBySlug(router?.query?.slug);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [idDelete, setIdDelete] = useState(null);
	const [listPhotos, setListPhotos] = useState([]);

	const createFormData = useCallback(async ({ upload_photo }) => {
		const formData = new FormData();
		for (let i = 0; i < upload_photo.length; i++) {
			Object.keys(upload_photo[i]).map((key) => {
				if (key === 'image') {
					formData.append(
						`images[${i}]${key}`,
						upload_photo[i][key],
						upload_photo[i][key].name
					);
				} else {
					formData.append(`images[${i}]${key}`, upload_photo[i][key]);
				}
			});
		}
		await onSubmit(formData);
		mutate();
	});

	const onSelectPhotos = useCallback((e) => {
		const files = [...e.target.files].map((file) => {
			const url = URL.createObjectURL(file);
			return {
				image: file,
				caption: '',
				recipe,
				url,
			};
		});
		setListPhotos((pre) => [...pre, ...files]);
	});

	useEffect(() => {
		setValue('upload_photo', listPhotos);
	}, [listPhotos]);

	const handleDelete = useCallback(() => {
		remove(idDelete);
		setListPhotos((preList) => {
			const list = [...preList];
			URL.revokeObjectURL(list[idDelete].url);
			list.splice(idDelete, 1);
			return list;
		});
		setShowConfirmDelete(false);
	});

	const confirmDelete = useCallback((id) => {
		setIdDelete(id);
		setShowConfirmDelete(true);
	});

	useEffect(() => {
		if (data) {
			const images = data.images.map(async (img) => {
				const file = await getFileFromUrl(img.image, 'recipe.png');
				return { ...img, image: file, url: img.image };
			});
			Promise.all(images).then((res) => setListPhotos(res));
		}
	}, [data]);

	return (
		<div className="mt-6 ">
			<ConfirmDelete
				handleDelete={handleDelete}
				showConfirm={showConfirmDelete}
				handleCloseConfirm={() => setShowConfirmDelete(false)}
			/>
			<input
				type="file"
				id="files"
				name="files"
				multiple
				onChange={onSelectPhotos}
				className="hidden"
				ref={inputFileRef}
			/>
			<Button
				icon={{ left: <MdAddToPhotos /> }}
				onClick={() => inputFileRef.current.click()}
				className="mb-7"
			>
				Add Photo
			</Button>

			{}
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<Loader type="searching" />
				</div>
			) : listPhotos.length > 0 ? (
				<Form
					onSubmit={handleSubmit(createFormData)}
					className="!flex-row gap-4 flex-wrap"
				>
					<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6">
						{fields.map((field, index) => (
							<div
								className="flex flex-col items-center relative"
								key={field.id}
							>
								{listPhotos[index].url && (
									<div className="relative group rounded-md overflow-hidden w-full">
										<Img
											alt="recipe photo"
											src={listPhotos[index]?.url}
											className="h-44 w-full  rounded-md"
											cover
										/>
										<div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] flex transition-all">
											<button
												type="button"
												onClick={() =>
													confirmDelete(index)
												}
												className="m-auto rounded-md px-2 bg-red text-white font-bold text-sm shadow-md"
											>
												Delete
											</button>
										</div>
									</div>
								)}
								<InputField
									type="text"
									name={`upload_photo.${index}.caption`}
									register={register}
									label="Caption (optional)"
								/>
							</div>
						))}
					</div>

					<Button
						type="submit"
						disabled={isSubmitting}
						className="mt-5 primary "
					>
						{isSubmitting && <Loader type="submitting" />}
						Save change
					</Button>
				</Form>
			) : (
				<div className="flex flex-col justify-center items-center gap-4 py-10">
					<Img
						src={images.no_search}
						alt="upload_photo"
						className="h-44 w-full"
					/>
					<span>You have not added any photos yet. Add some.</span>
				</div>
			)}
		</div>
	);
}

export default UploadPhoto;
