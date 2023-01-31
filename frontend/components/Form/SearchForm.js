import { useState } from 'react';
import { MdOutlineClose, MdSearch } from 'react-icons/md';
import { Form } from './FormControl';
import Loader from '@components/UI/Loader';

function SearchForm({ onSubmit }) {
	const [isTyping, setIsTyping] = useState(false);

	const handleChange = (e) => {
		e.target.value ? setIsTyping(true) : setIsTyping(false);
	};

	const handleSubmit = (data) => {
		setIsTyping(false);
		return onSubmit(data);
	};

	return (
		<Form onSubmit={handleSubmit}>
			{({ register, isSubmitting, reset }) => {
				return (
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
				);
			}}
		</Form>
	);
}

export default SearchForm;
