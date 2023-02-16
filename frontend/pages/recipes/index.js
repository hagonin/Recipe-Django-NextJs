import Link from 'next/link';

function Recipe() {
	return (
		<div className="container my-14">
			<h1>Grid Recipe</h1>
			<div className="flex flex-col">
				<Link href="/recipes/1">Item Recipe 1</Link>
				<Link href="/recipes/2">Item Recipe 2</Link>
				<Link href="/recipes/3">Item Recipe 3</Link>
			</div>
		</div>
	);
}

export default Recipe;
