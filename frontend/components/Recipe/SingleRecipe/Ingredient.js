import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import Check from './Check';

function Ingredient({ ingredients, isPreview }) {
	const ingredient = handleIngredientFromArr(ingredients);
	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col">
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
					<div className="flex flex-col">
						{item.items.map((i) =>
							isPreview ? (
								<span
									key={index}
								>{`${i.quantity} ${i.unit} ${i.title}`}</span>
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
	);
}

export default Ingredient;
