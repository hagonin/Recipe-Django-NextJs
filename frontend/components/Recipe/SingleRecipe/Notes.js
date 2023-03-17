import Title from "@components/UI/Title";

function Notes({ notes }) {
	return notes ? (
		<div>
			<Title title="NOTES" />
			<p className="first-letter:uppercase">{notes}</p>
		</div>
	) : (
		<></>
	);
}

export default Notes;
