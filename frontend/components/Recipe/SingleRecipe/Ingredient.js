import Title from '@components/UI/Title';
import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import uppercaseFirstLetter from '@utils/uppercaseFirstLetter';
import Check from './Check';

function Ingredient({ ingredients, isPreview }) {
	const ingredient = handleIngredientFromArr(ingredients);
	const handleUnit = (unit, quantity) => {
		const quan = quantity && quantity * 1;
		switch (true) {
			case unit === 'teaspoon(s)' && quan < 2:
				return 'teaspoon';
			case unit === 'teaspoon(s)' && quan >= 2:
				return unit;
			case unit === 'tablespoon(s)' && quan < 2:
				return 'tablespoon';
			case unit === 'tablespoon(s)' && quan >= 2:
				return unit;
			case unit === 'pound(s)' && quan >= 2:
				return unit;
			case unit === 'pound(s)' && quan < 2:
				return 'pound';
			case unit === 'cup(s)' && quan >= 2:
				return unit;
			case unit === 'cup(s)' && quan < 2:
				return 'cup';
			default:
				return unit;
		}
	};
	return (
		<div>
			<Title
				title="Ingredients"
				bottom="mb-2"
			/>
			<div className={`flex flex-col ${isPreview ? '' : 'lg:w-[80%]'}`}>
				<div className="flex flex-col ">
					{ingredient?.item.map((i, index) =>
						isPreview ? (
							<span
								key={index}
								className="text-base border-b pb-1 first-letter:capitalize"
							>
								<Quantity quantity={i.quantity} />
								{i.quantity
									? ` ${handleUnit(i.unit, i.quantity)} ${
											i.title
									  }`
									: uppercaseFirstLetter(
											`${handleUnit(
												i.unit,
												i.quantity
											)} ${i.title}`
									  )}
							</span>
						) : (
							<Check key={index}>
								<Quantity quantity={i.quantity} />
								{i.quantity
									? ` ${handleUnit(i.unit, i.quantity)} ${
											i.title
									  }`
									: uppercaseFirstLetter(
											`${handleUnit(
												i.unit,
												i.quantity
											)} ${i.title}`
									  )}
							</Check>
						)
					)}
				</div>
				<div className="flex flex-col gap-2 mt-3 ">
					{ingredient?.group.map((item, index) => (
						<div key={index}>
							<span className="text-base font-medium text-black  tracking-widest  ">
								{uppercaseFirstLetter(item.heading)}
							</span>
							<div className="flex flex-col">
								{item.items.map((i, index) =>
									isPreview ? (
										<span
											key={index}
											className="border-b pb-1 first-letter:capitalize"
										>
											<Quantity quantity={i.quantity} />
											{i.quantity
												? ` ${handleUnit(
														i.unit,
														i.quantity
												  )} ${i.title}`
												: uppercaseFirstLetter(
														`${handleUnit(
															i.unit,
															i.quantity
														)} ${i.title}`
												  )}
										</span>
									) : (
										<Check key={index}>
											<Quantity quantity={i.quantity} />
											{i.quantity
												? ` ${handleUnit(
														i.unit,
														i.quantity
												  )} ${i.title}`
												: uppercaseFirstLetter(
														`${handleUnit(
															i.unit,
															i.quantity
														)} ${i.title}`
												  )}
										</Check>
									)
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const Quantity = ({ quantity }) => (
	<span className="text-xbase">{quantity}</span>
);

export default Ingredient;
