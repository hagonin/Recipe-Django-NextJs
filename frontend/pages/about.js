function About(props) {
	return (
		<div className="container py-14">
			<span>{props.content}</span>
		</div>
	);
}
export async function getStaticProps() {
	const data = 'This is our about page';

	return {
		props: {
			content: data,
		},
	};
}
export default About;
