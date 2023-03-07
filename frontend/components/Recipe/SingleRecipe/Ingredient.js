import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import Check from './Check';

function Ingredient({ ingredients, isPreview }) {
	const ingredient = handleIngredientFromArr(ingredients);
	console.log(ingredient);
	return (
		<div className="">
			<div>
				{ingredient?.item.map((i, index) =>
					isPreview ? (
						<span key={index}>
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
			{ingredient?.group.map((item, index) => (
				<div>
					<span className="text-lg font-semibold text-black">
						{item.heading}
					</span>
					<div>
						{item.items.map((i) =>
							isPreview ? (
								<span
									key={index}
								>{`${i.quantity} ${i.unit} ${i.title}`}</span>
							) : (
								<CheckComponent
									key={index}
									label={`${i.quantity} ${i.unit} ${i.title}`}
								/>
							)
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default Ingredient;
