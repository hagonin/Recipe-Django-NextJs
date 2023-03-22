import Title from '@components/UI/Title';

const CommonSection = ({ title, children }) => (
	<div className="rounded px-5 pt-5  relative border border-border pb-7">
		{title && (
			<Title
				title={title}
				center
			/>
		)}
		{children}
	</div>
);

export default CommonSection;
