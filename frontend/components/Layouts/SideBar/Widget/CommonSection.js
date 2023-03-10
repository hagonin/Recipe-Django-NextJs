const CommonSection = ({ title, children }) => (
	<div className="border border-border rounded px-5 pt-5 pb-7 relative">
		{title && (
			<div className="text-center">
				<h6 className="inline-block text-blackLight leading-6 uppercase mb-6 font-semibold">
					{title}
				</h6>
			</div>
		)}
		{children}
	</div>
);

export default CommonSection;
