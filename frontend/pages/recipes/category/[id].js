import WidgetLayout from '@components/Layouts/WidgetLayout';
import Link from 'next/link';

function Category() {
	return (
		<>
			<p>Categories about ...</p>
			<div className="flex flex-col">
				<Link href="/recipes/1">Item Recipe 1</Link>
				<Link href="/recipes/2">Item Recipe 2</Link>
				<Link href="/recipes/3">Item Recipe 3</Link>
			</div>
		</>
	);
}

export default Category;

Category.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
