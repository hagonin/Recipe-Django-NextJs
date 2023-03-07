import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import Check from './Check';

function Ingredient({ ingredients, isPreview }) {
	const ingredient = handleIngredientFromArr(ingredients);
	return (
		<div className="flex flex-col gap-2">
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
					<h4>{item.heading}</h4>
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
