import axios from 'axios';

export const getFormAvatarFromUrl = (url, fileName) => {
	return axios.get(url, { responseType: 'blob' }).then((res) => {
		const file = new File([res.data], fileName);
		const formAvatar = new FormData();
		formAvatar.append('image_url', file, fileName);
		return formAvatar;
	});
};
