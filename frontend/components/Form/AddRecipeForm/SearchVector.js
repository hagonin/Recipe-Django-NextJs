import { useFieldArray } from "react-hook-form";

import { InputField } from "../FormControl";
import Button from "@components/UI/Button";

function SearchVector({control, register}) {
    const { fields, append, remove } = useFieldArray({
		control,
		name: 'recipe.search_vector',
	});
    return (
		<>
			<ul className="mt-3 flex flex-col gap-4 mb-4">
				{fields.map((item, index) => (
					<li
						key={item.id}
						className="flex items-center justify-between gap-4"
					>
						<InputField
							placeholder="search vector"
							name={`recipe.search_vector.${index}`}
							register={register}
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className="text-2xl text-red"
						>
							<MdDelete />
						</button>
					</li>
				))}
			</ul>
			<Button
				type="button"
				onClick={() => {
					append();
				}}
			>
				Add new search vector
			</Button>
		</>
	);
}

export default SearchVector;