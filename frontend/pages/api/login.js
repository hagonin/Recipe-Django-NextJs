import api from '@services/axios';
import cookie from 'cookie';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, password, remember } = req.body;
		try {
			const response = await api.post('/user/login/', {
				password,
				email,
			});

			const { access, refresh } = response.data.token;

			const profile = await api.get('/user/profile/', {
				headers: {
					Authorization: `Bearer ${access}`,
				},
			});

			if (remember) {
				//save token
				const A_DAY = 60 * 60 * 24;
				const A_MONTH = 60 * 60 * 24 * 30;
				res.setHeader('Set-Cookie', [
					cookie.serialize('tokenAccess', access, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: A_DAY,
						sameSite: 'strict',
						path: '/',
					}),
					cookie.serialize('tokenRefresh', refresh, {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: A_MONTH,
						sameSite: 'strict',
						path: '/',
					}),
				]);
			}

			res.status(profile?.status).json({
				...profile?.data,
			});
		} catch (error) {
			res.status(error?.response?.status).json({
				...error.response.data,
			});
		}
	} else {
		return res
			.status(405)
			.json({ error: `Method "${req.method}" not allowed.` });
	}
};

export default handler;
