import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import uppercaseFirstLetter from '@utils/uppercaseFirstLetter';
import Check from './Check';

function Ingredient({ ingredients, isPreview }) {
	const ingredient = handleIngredientFromArr(ingredients);
	return (
		<div className={`flex flex-col ${isPreview ? '' : 'md:w-[80%]'}`}>
			<div className="flex flex-col ">
				{ingredient?.item.map((i, index) =>
					isPreview ? (
						<span
							key={index}
							className="text-base border-b pb-1 capitalize"
						>
							{`${i.quantity} ${i.unit} ${i.title}`}
						</span>
					) : (
						<Check
							key={index}
							label={`${i.quantity} ${i.unit} ${i.title}`}
						/>
					)
				)}
			</div>
			<div className="flex flex-col gap-2 mt-3 ">
				{ingredient?.group.map((item, index) => (
					<div key={index}>
						<span className="font-medium text-black  tracking-widest  ">
							{uppercaseFirstLetter(item.heading)}
						</span>
						<div className="flex flex-col">
							{item.items.map((i, index) =>
								isPreview ? (
									<span
										key={index}
										className="border-b pb-1 "
									>
										{`${i.quantity} ${i.unit} ${i.title}`}
									</span>
								) : (
									<Check
										key={index}
										label={`${i.quantity} ${i.unit} ${i.title}`}
									/>
								)
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Ingredient;
