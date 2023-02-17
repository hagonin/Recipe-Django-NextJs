import Button from '@components/UI/Button';
import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { useFieldArray } from 'react-hook-form';
import { AiFillDelete } from 'react-icons/ai';
import { BsImages } from 'react-icons/bs';
import { InputField } from '../FormControl';

function Images({ control, register, handleChangeImage }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'recipe.images',
	});
	return (
		<div>
			<div className="flex lg:gap-6 md:gap-4 gap-2 overflow-x-auto">
				{fields.map((field, index) => {
					return (
						<div
							className="flex flex-col lg:w-1/4 md:1/3 w-1/2 rounded-md py-5"
							key={field.id}
						>
							<input
								type="file"
								onChange={(e) =>
									handleChangeImage(
										e.target.files[0].name,
										`recipe.images.${index}.image`
									)
								}
							/>
							<input
								type="text"
								{...register(`recipe.images.${index}.image`)}
							/>
							<div>
								<Img
									src={images.recipe1}
									alt="recipe"
									className="h-full w-full"
								/>
							</div>

							<input
								type="text"
								placeholder="caption"
								{...register(`recipe.images.${index}.caption`)}
								className="border-b border-border outline-none px-3 py-1 mt-3 focus:border-primary"
							/>
							<div className="mt-3 flex justify-between items-center">
								<label className="text-sm ">
									<input
										type="checkbox"
										{...register(
											`recipe.images.${index}.default`
										)}
										className="mr-2"
									/>
									Default
								</label>
								<button
									onClick={() => remove(index)}
									className="text-xl hover:text-red"
								>
									<AiFillDelete />
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<Button
				icon={{ left: <BsImages /> }}
				className="mt-5"
				onClick={() => append()}
			>
				Add image
			</Button>
		</div>
	);
}

export default Images;
