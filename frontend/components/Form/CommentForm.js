import { useForm } from 'react-hook-form';

import Button from '@components/UI/Button';
import { CheckboxField, Form, InputField, TextAreaField } from './FormControl';

const init = {
	message: 'comment.message',
	name: 'comment.name',
	email: 'comment.email',
	website: 'comment.website',
	saveInfo: 'comment.saveinfo',
};
function CommentForm({ onSubmit }) {
	const { handleSubmit, register } = useForm();
	return (
		<>
			<h3 className="mb-7">Leave a comment</h3>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<TextAreaField
					name={init.message}
					register={register}
					placeholder="Message"
					rows="6"
				/>
				<div className="flex gap-4">
					<InputField
						name={init.name}
						type="text"
						register={register}
						placeholder="Name"
					/>
					<InputField
						name={init.email}
						type="email"
						register={register}
						placeholder="Email"
						required
					/>
					<InputField
						name={init.website}
						type="text"
						register={register}
						placeholder="Website"
					/>
				</div>
				<CheckboxField
					register={register}
					name={init.saveInfo}
					isSingle={{
						label: 'Save my name, email, and website in this browser for the next time I comment.',
					}}
				/>
				<Button
					className="lg"
					type="submit"
				>
					Post comment
				</Button>
			</Form>
		</>
	);
}

export default CommentForm;
