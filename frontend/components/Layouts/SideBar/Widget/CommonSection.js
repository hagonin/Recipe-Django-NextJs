const CommonSection = ({ title, children }) => (
	<div className="border border-border rounded px-5 pt-5 pb-7 relative">
		{title && (
			<div className="text-center">
				<h5 className="inline-block text-black leading-6 uppercase mb-6 ">
					{title}
				</h5>
			</div>
		)}
		{children}
	</div>
);

export default CommonSection;
