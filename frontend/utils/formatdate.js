function formatDate(date) {
	if (date) {
		const d = new Date(date);
		const dd = d.getDate();
		const monthArr = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const mm = monthArr[d.getMonth()];
		const yyyy = d.getFullYear();

		return `${mm} ${dd}, ${yyyy}`;
	}
}

export default formatDate;
