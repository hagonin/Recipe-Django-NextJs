import axios from 'axios';

export const getFileFromUrl = async (url, name) => {
	const res = await axios.get(url, { responseType: 'blob' });
	const file = new File([res.data], name, {
		type: res?.data.type,
	});
	return file;
};

export const createAvatarForm = async (url, fileName) => {
	const file = await getFileFromUrl(url, fileName);
	const formAvatar = new FormData();
	formAvatar.append('avatar', file, fileName);
	return formAvatar;
};
