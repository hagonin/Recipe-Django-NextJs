import api from '@services/axios';
import cookie from 'cookie';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const cookies = cookie.parse(req.headers.cookie || '');
		const { tokenAccess } = cookies;

		try {
			const response = await api.get('/user/profile/', {
				headers: {
					Authorization: `Bearer ${tokenAccess}`,
				},
			});
			res.status(response?.status).json({
				...response?.data,
			});
		} catch (error) {
			res.status(error?.response?.status).json({
				...error?.response?.data,
			});
		}
	} else {
		res.status(405).json({
			error: `Method "${req.method}" not allowed.`,
		});
	}
};

export default handler;
