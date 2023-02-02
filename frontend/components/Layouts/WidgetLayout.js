import Widget from './SideBar/Widget';

function WidgetLayout({ children }) {
	return (
		<div className="container grid md:grid-cols-12 grid-cols-1 md:gap-8 gap-4 my-14">
			<div className="md:col-span-8">{children}</div>
			<div className="md:col-span-4">
				<Widget />
			</div>
		</div>
	);
}

export default WidgetLayout;
