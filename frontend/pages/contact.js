import Banner from '../components/Banner';
import SideBarLayout from '../components/Layouts/SideBarLayout';

function Contact() {
	return <p>Contact</p>;
}

export default Contact;

Contact.getLayout = (page) => {
	return (
		<>
			<Banner />
			<SideBarLayout>{page}</SideBarLayout>
		</>
	);
};
