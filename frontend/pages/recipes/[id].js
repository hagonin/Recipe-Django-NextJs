import WidgetLayout from '@components/Layouts/WidgetLayout';
import Link from 'next/link';

function RecipeDetail() {
	return (
		<>
			<span>Recipe detail</span>
			<Link href='/recipes'>Back recipe page</Link>
		</>
	);
}

export default RecipeDetail;

RecipeDetail.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
