import api from '@services/axios';
import noCache from '@utils/noCache';

const fetcher = async ({ url, config }) => {
	const res = await api.get(`${url}${noCache()}`, config);
	return res?.data?.results || res?.data;
};
export default fetcher;
