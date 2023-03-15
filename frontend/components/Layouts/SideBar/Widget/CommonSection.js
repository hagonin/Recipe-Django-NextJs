const CommonSection = ({ title, children, noBorder }) => (
	<div
		className={` rounded px-5 pt-5  relative ${
			noBorder ? '' : 'border border-border pb-7'
		}`}
	>
		{title && (
			<div className="text-center ">
				<h6 className="text-sm inline-block text-blackLight leading-6 uppercase mb-6 font-medium pb-1 border-b  border-b-primary tracking-widest">
					{title}
				</h6>
			</div>
		)}
		{children}
	</div>
);

export default CommonSection;
