export const required = (value, message) => (value ? undefined : message);
export const email = (value) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return true;
	} else {
		return 'Email is invalid';
	}
};
