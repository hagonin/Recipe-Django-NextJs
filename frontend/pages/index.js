import Category from '@components/Categories';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import Slider from '@components/Slider';
import SubScribe from '@components/Subscribe';
import { useAuthContext } from '@context/auth-context';
import api from '@services/axios';
import { useRouter } from 'next/router';

export default function Home() {
	return (
		<>
			<Category />
		</>
	);
}

Home.getLayout = function (page) {
	return (
		<>
			<Slider />
			<SubScribe />
			<WidgetLayout>{page}</WidgetLayout>
		</>
	);
};
