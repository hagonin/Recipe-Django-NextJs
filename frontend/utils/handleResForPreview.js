import createMarkup from './createMarkup';
import formatDate from './formatdate';

function handleResDataForPreView(res) {
	const {
		user: author,
		description: desc,
		instructions: ins,
		image_url: image,
		created_at: cre,
		updated_at: up,
		images: imgs,
		...rest
	} = res?.data;
	const description = createMarkup(desc);
	const instructions = createMarkup(ins);
	const created_at = formatDate(cre);
	const updated_at = formatDate(up);

	const images = imgs.map(({ image_url: url, caption, id }) => ({
		url,
		caption,
		id,
	}));
	return {
		author,
		image,
		description,
		instructions,
		created_at,
		updated_at,
		images: images,
		...rest,
	};
}

export default handleResDataForPreView;
