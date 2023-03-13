import { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineClose, MdSearch } from 'react-icons/md';
import Loader from '@components/UI/Loader';
import { useForm } from 'react-hook-form';
import { InputField } from './FormControl';
import Button from '@components/UI/Button';
import { useRecipeContext } from '@context/recipe-context';
import { RiLoader4Line } from 'react-icons/ri';

function SearchForm({ onSubmit, secondary }) {
	const {
		register,
		formState: { isSubmitting },
		reset,
		handleSubmit,
	} = useForm();
	const [isTyping, setIsTyping] = useState(false);
	const { keywords } = useRecipeContext();
	const [listSuggest, setListSuggest] = useState([]);
	const searchBoxRef = useRef();

	const handleChange = (e) => {
		const value = e.target.value;
		const arr = [];
		keywords.map((word) => {
			if (word.indexOf(value) > -1) {
				arr.push(word);
			}
		});
		setListSuggest(arr);
		value ? setIsTyping(true) : setIsTyping(false);
	};

	const handleBeforeSubmit = async (data) => {
		await onSubmit(data);
		setIsTyping(false);
		reset();
		setListSuggest([]);
	};

	const handleReset = () => {
		reset();
		setIsTyping(false);
		setListSuggest([]);
	};

	const handleClickDocs = (e) => {
		if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
			setListSuggest([]);
		}
	};

	useEffect(() => {
		const docClick = document.addEventListener('click', handleClickDocs);
		return document.removeEventListener('click', docClick);
	}, []);

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
				<div
					className="flex relative"
					ref={searchBoxRef}
				>
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
						className="text-lg lg:w-[300px] pr-2 placeholder-white bg-transparent outline-none "
						{...register('search', {
							required: true,
							onChange: handleChange,
						})}
					/>
					{listSuggest.length > 0 && (
						<div className="absolute z-[999] top-full left-8 w-full bg-white shadow-md py-2 rounded-b-md max-h-[50vh] overflow-y-auto scrollbar">
							<ul className="text-black text-base list-none p-0 m-0 ">
								{listSuggest.map((suggest, index) => (
									<li
										key={index}
										className="hover:bg-third px-3 py-1 cursor-pointer"
										onClick={() =>
											handleBeforeSubmit({ suggest })
										}
									>
										{suggest}
									</li>
								))}
							</ul>
						</div>
					)}

					<div className="flex items-center justify-center px-2">
						{isSubmitting && <Loader type="searching" />}
						{isTyping && (
							<button
								type="button"
								className="text-xl text-white cursor-pointer relative top-[1px]"
								onClick={handleReset}
							>
								<MdOutlineClose />
							</button>
						)}
						{isSubmitting && <RiLoader4Line />}
					</div>
				</div>
			)}
		</form>
	);
}

export default SearchForm;
