import { memo } from 'react';
import { useFieldArray } from 'react-hook-form';

import { BsImages } from 'react-icons/bs';

import Button from '@components/UI/Button';
import Preview from './Preview';

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
								type="text"
								{...register(`recipe.images.${index}.image`)}
								className="invisible"
							/>
							<Preview
								name={`recipe.images.${index}.image`}
								handleChangeImage={handleChangeImage}
								handleDelete={() => remove(index)}
							/>
							<input
								type="text"
								placeholder="caption"
								{...register(`recipe.images.${index}.caption`)}
								className="border-b border-border outline-none px-3 py-1 focus:border-primary"
							/>
							<div className="mt-3 flex justify-between items-center">
								{/* <label className="text-sm ">
									<input
										type="radio"
										{...register(
											`recipe.images.default`
										)}
										className="mr-2"
									/>
									Default
								</label> */}
								{/* <button
									onClick={() => remove(index)}
									className="text-xl hover:text-red"
								>
									<AiFillDelete />
								</button> */}
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

export default memo(Images);
