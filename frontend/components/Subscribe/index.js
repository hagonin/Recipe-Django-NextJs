import SubscribeForm from '@components/Form/SubscribeForm';

function SubScribe() {
	return (
		<section className="container bg-grey py-4 px-5 flex md:items-center justify-between max-md:flex-col mt-4">
			<div>
				Don't miss a single recipe!
				<br />
				<span className="text-sm">
					Subscribe to receive new recipes straight to your inbox!
				</span>
			</div>
			<SubscribeForm />
		</section>
	);
}

export default SubScribe;
