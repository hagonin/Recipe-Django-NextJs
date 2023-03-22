import Widget from './SideBar/Widget';

function WidgetLayout({ children }) {
	return (
		<div className="container grid md:grid-cols-12 grid-cols-1 md:gap-6 lg:gap-8 2xl:gap-10 gap-x-4 gap-y-8 my-10">
			<div className="md:col-span-8">{children}</div>
			<div className="md:col-span-4">
				<Widget />
			</div>
		</div>
	);
}

export default WidgetLayout;
