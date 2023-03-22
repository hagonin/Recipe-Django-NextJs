import { convertFractiontoUnicode } from '@utils/convertFractionToUnicode';
import handleIngredientFromArr from '@utils/handleIngredientFromArr';
import { handleUnit } from '@utils/handleUnit';
import uppercaseFirstLetter from '@utils/uppercaseFirstLetter';

import Title from '@components/UI/Title';
import Check from './Check';

function Ingredient({ ingredients, isPreview }) {
	const ingredient = handleIngredientFromArr(ingredients);

	return (
		<div>
			<Title
				title="Ingredients"
				bottom="mb-3"
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
				<div className="flex flex-col gap-2 ">
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
											className="border-b pb-1 first-letter:capitalize text-base"
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

const Quantity = ({ quantity }) => {
	const indexFraction = quantity?.indexOf('/');
	if (indexFraction > -1) {
		const fraction = quantity.slice(indexFraction - 1);
		const fractionFromCharCode = convertFractiontoUnicode(fraction);
		const number = quantity.slice(0, indexFraction - 1);
		return (
			<>
				<span className="text-base">{number}</span>
				<span className="text-[17px]">{fractionFromCharCode}</span>
			</>
		);
	} else {
		return <span className="text-base">{quantity}</span>;
	}
};

export default Ingredient;
