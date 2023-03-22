export const email = {
	required: 'Please enter your email',
	pattern: {
		value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		message: 'Email is not valid',
	},
};

export const keyword = {
	required: 'What keyword is used to search this recipe?',
	pattern: {
		value: /^[a-zA-Z0-9\s]+$/,
		message: 'Please enter valid keyword.',
	},
};


export const password = {
	required: 'Please enter your password',
	pattern: {
		value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
		message: 'Password must be stronger',
	},
};

export const name = {
	pattern: {
		value: /^([a-zA-Z ]){2,30}$/,
		message: 'Please enter a valid name',
	},
};

export const first_name = {
	...name,
};

export const last_name = {
	...name,
};

export const user_name = {
	required: 'Please enter user name',
	...name,
};
