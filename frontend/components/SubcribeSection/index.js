import SubscribeForm from '@components/Form/SubscribeForm';

function SubscribeSection() {
	return (
		<section className="container bg-grey py-4 px-5 flex md:items-center md:gap-6 gap-2 justify-between max-md:flex-col  rounded-md">
			<div>
				<span className="font-medium text-lg leading-4">
					Don't miss a single recipe!
				</span>
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
