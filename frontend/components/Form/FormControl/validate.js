export const email = {
	value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	message: 'Email is not valid',
};

export const keyword = {
	required: 'What keyword is used to search this recipe?',
	pattern: {
		value: /^[a-zA-Z0-9\s]+$/,
		message: 'Please enter valid keyword.',
	},
};
