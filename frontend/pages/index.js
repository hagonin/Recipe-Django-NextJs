import SideBarLayout from '../components/Layouts/SideBarLayout';
import Slider from '../components/Slider';

export default function Home() {
	return <>Home</>;
}

Home.getLayout = function (page) {
	return (
		<>
			<Slider />
			<SideBarLayout>{page}</SideBarLayout>
		</>
	);
};
