import { useEffect, useState } from 'react';
import { MdOutlineClose, MdSearch } from 'react-icons/md';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';
import { InputField } from './FormControl';
import Button from '@components/UI/Button';
import { useRecipeContext } from '@context/recipe-context';

function SearchForm({ onSubmit, secondary }) {
	const {
		register,
		formState: { isSubmitting, isSubmitSuccessful },
		reset,
		handleSubmit,
	} = useForm();
	const [isTyping, setIsTyping] = useState(false);

	const handleChange = (e) => {
		e.target.value ? setIsTyping(true) : setIsTyping(false);
	};

	const handleBeforeSubmit = (data) => {
		setIsTyping(false);
		onSubmit(data);
	};

	useEffect(() => {
		isSubmitSuccessful && reset();
	}, [isSubmitSuccessful]);

	return (
		<form
			onSubmit={handleSubmit(handleBeforeSubmit)}
			noValidate={true}
		>
			{secondary ? (
				<div className="flex flex-col gap-4 w-full">
					<InputField
						name="search"
						type="text"
						placeholder="Type to search"
						register={register}
						rules={{
							required: true,
							onChange: handleChange,
						}}
					/>
					<Button
						type="submit"
						className="lg"
					>
						{isSubmitting && <Loader type="submitting" />}
						Search
					</Button>
				</div>
			) : (
				<div className="flex relative">
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
						className="text-lg w-full pr-2 placeholder-white bg-transparent outline-none focus:border-b focus:border-grey"
						{...register('search', {
							required: true,
							onChange: handleChange,
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
			)}
		</form>
	);
}

export default SearchForm;
