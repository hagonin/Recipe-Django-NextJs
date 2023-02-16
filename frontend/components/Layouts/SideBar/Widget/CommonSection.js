const CommonSection = ({ title, children }) => (
	<div className="border border-border rounded px-5 pt-5 pb-7 relative">
		{title && (
			<div className="text-center">
				<h4 className="inline-block leading-6 uppercase border-b border-second mb-6 ">
					{title}
				</h4>
			</div>
		)}
		{children}
	</div>
);

export default CommonSection;
