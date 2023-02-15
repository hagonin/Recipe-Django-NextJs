import api from '@services/axios';

async function handler(req, res) {
	if (req.method === 'POST') {
		const dataForm = req.body;
		try {
			const response = await api.post('/user/register/', {
				...dataForm,
			});

			res.status(response?.status).json({
				success: true,
			});
		} catch (error) {
			return res.status(error.response.status).json({
				...error.response.data,
			});
		}
	} else {
		res.status(405).json({
			error: `Method "${req.method}" not allowed.`,
		});
	}
}

export default handler;
