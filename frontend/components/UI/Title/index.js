function Title({ title, center }) {
	return (
		<div className={`${center ? 'text-center' : ''}`}>
			<h6 className="text-sm inline-block text-blackLight leading-6 uppercase mb-5 font-medium pb-1 border-b  border-b-primary tracking-widest">
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
