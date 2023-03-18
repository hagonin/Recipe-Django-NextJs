import SubscribeForm from '@components/Form/SubscribeForm';

function SubscribeSection({ className, secondary }) {
	return (
		<section
			className={`container bg-grey pt-4 pb-6 px-5 flex lg:items-center  md:gap-6 gap-2 justify-between lg:flex-row flex-col  md:rounded-md mt-10 ${className}`}
		>
			<div className="flex-1">
				<span className="font-medium text-lg leading-4">
					Don't miss a single recipe!
				</span>
				<br />
				<span>
					Subscribe to receive new recipes straight to your inbox!
				</span>
			</div>
			<div className={`${secondary ? 'w-full' : ''}`}>
				<SubscribeForm secondary={secondary} />
			</div>
		</section>
	);
}

export default SubscribeSection;
