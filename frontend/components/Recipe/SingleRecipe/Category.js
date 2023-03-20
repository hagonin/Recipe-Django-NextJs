import { FaTags } from 'react-icons/fa';

function Category({ category, lg }) {
	return (
		category && (
			<span
				className={`tag font-bold ${
					lg ? 'md:text-sm text-base' : 'text-[0.68rem]'
				} uppercase  !text-red2 inline-flex  rounded-md gap-2 leading-7 items-center whitespace-nowrap relative top-[2px]`}
			>
				<FaTags />
				{category}
			</span>
		)
	);
}

export default Category;
