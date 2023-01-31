export const emailRules = {
	required: 'Email is required',
	pattern: {
		value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		message: 'Email is invalid',
	},
};
export const passwordRules = {
	required: 'Password is required',
	minLength: {
		value: 6,
		message: 'At least 6 characters',
	},
};
