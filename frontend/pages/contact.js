import Banner from '@components/Banner';
import ContactForm from '@components/Form/ContactForm';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import sleep from '@utils/sleep';

function Contact() {
	const onSubmit = async (data) => {
		const res = await sleep(3000, data);
		console.log('RES FROM CONTACT FORM', res);
	};
	return (
		<>
			<Banner />
			<WidgetLayout>
				<h1>Contact</h1>
				<p className="mt-3">
					We are always on the lookout for talented new writers,
					recipe developers, equipment reviewers, and photographers
					who love cooking to join our team of contributors. Please
					contact with us via email.
				</p>
				<ContactForm onSubmit={onSubmit} />
			</WidgetLayout>
		</>
	);
}

export default Contact;
