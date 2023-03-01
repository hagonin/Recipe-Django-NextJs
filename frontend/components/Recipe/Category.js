import RecipeCard from '@components/Recipe/RecipeCard';
import Img from '@components/UI/Image';

function Category({ name, cover, desc, recipes }) {
	return (
		<>
			<div className="border-b border-border pb-5">
				<Img
					src={cover}
					alt={name}
				/>
				<h1 className="mt-6 capitalize">{name}</h1>
				<p className="mt-3">{desc}</p>
			</div>
			<div className="grid">
				{recipes.map((recipe) => (
					<RecipeCard
						key={recipe.id}
						{...recipe}
						lgCard
						border
						className="grid lg:grid-cols-12 gap-6 grid-cols-1"
					/>
				))}
			</div>
		</>
	);
}

export default Category;
