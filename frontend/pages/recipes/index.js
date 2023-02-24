import WidgetLayout from '@components/Layouts/WidgetLayout';
import Button from '@components/UI/Button';
import Link from 'next/link';
import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from 'react-icons/hi';

function Recipe() {
	return (
		<div className="container my-14">
			<h1>Grid Recipe</h1>
			<div className="flex flex-col">
				<Link href="/recipes/1">Item Recipe 1</Link>
				<Link href="/recipes/2">Item Recipe 2</Link>
				<Link href="/recipes/3">Item Recipe 3</Link>
			</div>
			<div className="flex justify-between">
				<Button icon={{ left: <HiOutlineChevronDoubleLeft /> }}>
					Previous Recipe
				</Button>
				<Button icon={{ right: <HiOutlineChevronDoubleRight /> }}>
					Next recipe
				</Button>
			</div>
		</div>
	);
}

export default Recipe;

Recipe.getLayout = (page) => <WidgetLayout>{page}</WidgetLayout>;
// export const getStaticProps = () => {};
