import { useState } from 'react';
import { MdOutlineClose, MdSearch } from 'react-icons/md';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';

function SearchForm({ onSubmit }) {
	const {
		register,
		formState: { isSubmitting },
		reset,
		handleSubmit,
	} = useForm();
	const [isTyping, setIsTyping] = useState(false);

	const handleChange = (e) => {
		e.target.value ? setIsTyping(true) : setIsTyping(false);
	};

	const handleBeforeSubmit = (data) => {
		setIsTyping(false);
		return onSubmit(data);
	};

	return (
		<form
			onSubmit={handleSubmit(handleBeforeSubmit)}
			noValidate={true}
		>
			<div className="flex">
				<button
					className="px-2 text-2xl"
					type="submit"
				>
					<MdSearch />
				</button>
				<input
					id="search"
					type="text"
					placeholder="Type to search"
					className="w-full pr-2 placeholder-white bg-transparent outline-none focus:border-b focus:border-grey"
					{...register('search', {
						onChange: handleChange,
						required: true,
					})}
				/>
				<div className="flex items-center justify-center px-2">
					{isSubmitting && <Loader type="searching" />}
					{isTyping && (
						<button
							type="button"
							className="text-xl text-white cursor-pointer relative top-[1px]"
							onClick={() => {
								reset();
								setIsTyping(false);
							}}
						>
							<MdOutlineClose />
						</button>
					)}
				</div>
			</div>
		</form>
	);
}

export default SearchForm;
