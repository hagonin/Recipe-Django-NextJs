function Title({ title, center, bottom = 'mb-5' }) {
	return (
		<div className={`${center ? 'text-center' : ''}`}>
			<h6
				className={`text-sm inline-block text-blackLight leading-6 uppercase  font-medium pb-1 border-b  border-b-primary tracking-widest ${bottom}`}
			>
				{title}
			</h6>
		</div>
	);
}

function TitlePrimary({ title, center }) {
	return (
		<h1 className={`font-serif capitalize ${center ? 'text-center' : ''}`}>
			{title}
		</h1>
	);
}
export default Title;
export { TitlePrimary };
