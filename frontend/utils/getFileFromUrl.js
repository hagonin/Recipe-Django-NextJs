import axios from 'axios';

export const getFileFromUrl = async (url, name) => {
	const res = await axios.get(url, { responseType: 'blob' });
	const file = new File([res.data], name);
	return file;
};

export const createAvatarForm = (url, fileName) => {
	const file = getFileFromUrl(url, fileName);
	const formAvatar = new FormData();
	formAvatar.append('avatar', file, fileName);
	return formAvatar;
};
