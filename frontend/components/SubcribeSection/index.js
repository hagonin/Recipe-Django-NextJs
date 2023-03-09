import SubscribeForm from '@components/Form/SubscribeForm';

function SubscribeSection() {
	return (
		<section className="container bg-grey py-4 px-5 flex md:items-center gap-6 justify-between max-md:flex-col  rounded-md">
			<div>
				Don't miss a single recipe!
				<br />
				<span>
					Subscribe to receive new recipes straight to your inbox!
				</span>
			</div>
			<SubscribeForm />
		</section>
	);
}

export default SubscribeSection;
