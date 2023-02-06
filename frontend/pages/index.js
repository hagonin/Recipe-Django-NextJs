import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/Slider';
import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { useRouter } from 'next/router';

export default function Home() {
	 
	return (
		<>
			<h1>Chocolate Chip Cookies h1</h1>
			<h1>Contact</h1>
			<h2>Crispy Croissants and Butter h2</h2>
			<h2>Chocolate Heaven h2</h2>
			<h3>ABOUT ME h3</h3>
			<h4>Lucid Themes h4</h4>
		</>
	);
}

Home.getLayout = function (page) {
	return (
		<>
			<Slider />
			<WidgetLayout>{page}</WidgetLayout>
		</>
	);
};
