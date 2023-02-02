import { useFormContext } from 'react-hook-form';

import Button from '@components/UI/Button';
import Loader from '@components/UI/Loader';

function BtnForm({ type = 'submit', label }) {
	const { isSubmitting, reset } = useFormContext();

	return (
		<Button
			type={type}
			styles={{
				lgSize: true,
				cancle: type === 'reset',
				primary: type === 'submit',
			}}
			className="w-full"
			onClick={type === 'reset' ? reset : () => {}}
		>
			{isSubmitting && type === 'submit' && <Loader type="submitting" />}
			{label}
		</Button>
	);
}

export default BtnForm;
