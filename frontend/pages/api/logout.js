import cookie from 'cookie';

const handler = (req, res) => {
	if (req.method === 'POST') {
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('tokenAccess', '', {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: new Date(0),
				sameSite: 'strict',
				path: '/',
			})
		);

		res.status(200).json({
			success: true,
		});
	} else {
		res.status(405).json({
			error: `Method "${req.method}" not allowed.`,
		});
	}
};

export default handler;
