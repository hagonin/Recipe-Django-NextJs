import { memo } from 'react';
import SideBar from './SideBar';

function SideBarLayout({ children }) {
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-8">{children}</div>
			<div className="col-span-4">
				<SideBar />
			</div>
		</div>
	);
}

export default SideBarLayout;
