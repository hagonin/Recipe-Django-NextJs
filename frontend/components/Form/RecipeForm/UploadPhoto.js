import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';

import { images } from '@utils/constants';
import { getFileFromUrl } from '@utils/getFileFromUrl';
import { images as imageDefault } from '@utils/constants';

import useRecipeBySlug from 'hook/useRecipeBySlug';
import { MdAddToPhotos } from 'react-icons/md';

import ConfirmDelete from '../ConfirmDelete';
import { Form } from '../FormControl';
import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import Loader from '@components/UI/Loader';

function UploadPhoto({ onSubmit, recipe }) {
	const {
		register,
		control,
		handleSubmit,
		formState: { isSubmitting },
		setValue,
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
	const [listPhotos, setListPhotos] = useState(null);

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
				const file = await getFileFromUrl(
					img.image || imageDefault.recipe_default,
					'recipe.png'
				);
				return { ...img, image: file, url: img.image };
			});
			Promise.all(images).then((res) => setListPhotos(res));
		}
	}, [data]);

	return (
		<div className="mt-10 ">
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

			{isLoading || !listPhotos ? (
				<div className="flex items-center justify-center">
					<Loader type="searching" />
				</div>
			) : listPhotos.length > 0 ? (
				<Form
					onSubmit={handleSubmit(createFormData)}
					className="gap-4 flex-wrap justify-center items-center"
				>
					<div className="flex flex-wrap lg:gap-6 md:gap-4 gap-2 justify-center">
						{fields.map((field, index) => (
							<div
								className="flex flex-col items-center relative"
								key={field.id}
							>
								{listPhotos[index]?.url && (
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

								<input
									type="text"
									{...register(
										`upload_photo.${index}.caption`
									)}
									className="text-base border-b border-border outline-none px-2 py-1"
									placeholder="caption"
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
