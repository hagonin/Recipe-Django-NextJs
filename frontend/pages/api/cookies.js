import cookie from 'cookie';

export default async (req, res) => {
	const { token } = req.body;
	if (token) {
		const A_WEEK = 60 * 60 * 24 * 7;
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: A_WEEK,
				sameSite: 'strict',
				path: '/',
			})
		);
		return res.status(200).json({
			success: 'set token successfully',
		});
	} else {
		res.status(400).json({
			error: 'Set cookie failed',
		});
	}
};
