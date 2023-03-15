import Title from '@components/UI/Title';

const CommonSection = ({ title, children, noBorder }) => (
	<div
		className={` rounded px-5 pt-5  relative ${
			noBorder ? '' : 'border border-border pb-7'
		}`}
	>
		{title && <Title title={title} />}
		{children}
	</div>
);

export default CommonSection;
