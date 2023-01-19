import SideBarLayout from '@layouts/SideBarLayout';
import Slider from '@components/Slider';

export default function Home() {
	return (
		<>
			<h1>Chocolate Chip Cookies h1</h1>
			<h1>Contact</h1>
			<h2>Crispy Croissants and Butter h2</h2>
			<h2>Chocolate Heaven h2</h2>
			<h3>ABOUT ME h3</h3>
			<h4>Lucid Themes h4</h4>
			<ul>
				<li>Lorem ipsum dolor sit amet</li>
				<li>Lorem ipsum dolor sit amet</li>
				<li>Lorem ipsum dolor sit amet</li>
				<li>Lorem ipsum dolor sit amet</li>
			</ul>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Phasellus consectetur metus aliquam lacus bibendum, non
				sollicitudin diam dignissim. Suspendisse hendrerit ipsum eu
				sapien tincidunt, vitae commodo dui laoreet. Nunc sed euismod
				dui. Etiam placerat auctor posuere. Maecenas ac imperdiet lorem,
				eget eleifend quam. Aenean facilisis scelerisque diam. Aenean
				consectetur nisi sed laoreet scelerisque.
			</p>
		</>
	);
}

Home.getLayout = function (page) {
	return (
		<>
			<Slider />
			<SideBarLayout>{page}</SideBarLayout>
		</>
	);
};
