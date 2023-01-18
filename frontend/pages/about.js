import SideBarLayout from '../components/Layouts/SideBarLayout';

function About() {
	return <p>About</p>;
}

export default About;

About.getLayout = (page) => <SideBarLayout>{page}</SideBarLayout>;
