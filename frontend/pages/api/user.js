import api from '@services/axios';
import axios from 'axios';
import cookie from 'cookie';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const cookies = cookie.parse(req.headers.cookie || '');
		const token = cookies.tokenAccess;

		if (token) {
			// res.status(200).json({
			// 	token: token,
			// });
			try {
				const response = api.get('/user/profile/', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				res.status(200).json({
					success: true,
					data: response.data,
				});
			} catch (error) {
				return res.status(error.response.status).json({
					error: error.response.data,
				});
			}
		} else {
			res.status(401).json({
				error: 'You must login first',
			});
		}
	} else {
		res.status(405).json({
			error: `Method "${req.method}" not allowed.`,
		});
	}
};

export default handler;
