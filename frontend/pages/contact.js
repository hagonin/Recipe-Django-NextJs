import sleep from '@utils/sleep';

import Banner from '@components/Banner';
import ContactForm from '@components/Form/ContactForm';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import { TitlePrimary } from '@components/UI/Title';
import toastMessage from '@utils/toastMessage';

function Contact() {
	const onSubmit = async (data) => {
		const res = await sleep(3000, data);
		toastMessage({
			message: (
				<span>
					<span className="text-primary font-semibold">Thank you.</span>
					<br />
					We've received your message and will reply as soon as
					possible.
				</span>
			),
		});
		console.log('CONTACT FORM', res);
	};
	return (
		<>
			<Banner />
			<WidgetLayout>
				<TitlePrimary title="Contact" />
				<p className="mt-3 mb-10">
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
