import { useFormContext } from 'react-hook-form';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';

function Submit({ type }) {
	const { isSubmitting } = useFormContext();
	return (
		<Button
			type="submit"
			styles={{ primary: true, lgSize: true }}
			className="w-full capitalize"
		>
			{isSubmitting && <Loader type="submitting" />}
			{type}
		</Button>
	);
}

export default Submit;
