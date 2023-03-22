import sleep from '@utils/sleep';

import Banner from '@components/Banner';
import ContactForm from '@components/Form/ContactForm';
import WidgetLayout from '@components/Layouts/WidgetLayout';
import { TitlePrimary } from '@components/UI/Title';
import toastMessage from '@utils/toastMessage';
import { meta, toast_message } from '@utils/constants';

function Contact() {
	const onSubmit = async (data) => {
		await sleep(3000, data);
		toastMessage({
			message: (
				<span>
					<span className="text-primary font-semibold">
						Thank you.
					</span>
					<br />
					{toast_message.contact}
				</span>
			),
		});
	};
	return (
		<>
			<Banner />
			<WidgetLayout>
				<TitlePrimary title="Contact" />
				<p className="mt-3 mb-4">{meta.contact}</p>
				<ContactForm onSubmit={onSubmit} />
			</WidgetLayout>
		</>
	);
}

export default Contact;
