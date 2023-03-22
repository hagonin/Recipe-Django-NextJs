import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { MdOutlineClose, MdSearch } from 'react-icons/md';
import { RiLoader4Line } from 'react-icons/ri';
import { useRecipeContext } from '@context/recipe-context';
import { InputField } from './FormControl';
import Loader from '@components/UI/Loader';
import Button from '@components/UI/Button';

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
			className="max-md:w-full"
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
						className="lg primary"
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
						className="px-2 lg:text-2xl md:text-3xl text-5xl"
						type="submit"
					>
						<MdSearch />
					</button>
					<input
						id="search"
						type="text"
						placeholder="Type to search"
						className="text-lg lg:w-[300px] w-full pr-2 placeholder-white bg-transparent outline-none "
						{...register('search', {
							required: true,
							onChange: handleChange,
						})}
					/>
					{listSuggest.length > 0 && (
						<>
							<div
								className="block md:hidden fixed  top-12 left-0 z-10 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]"
								onClick={handleReset}
							></div>
							<div className="absolute top-full z-20 left-9 right-7 bg-white shadow-md py-2 rounded-b-md overflow-hidden max-h-[50vh] overflow-y-auto scrollbar">
								<ul className="text-black text-base list-none p-0 m-0 ">
									{listSuggest.map((suggest, index) => (
										<li
											key={index}
											className="hover:bg-third px-3 py-1 cursor-pointer"
											onClick={() =>
												handleBeforeSubmit({
													search: suggest,
												})
											}
										>
											{suggest}
										</li>
									))}
								</ul>
							</div>
						</>
					)}

					<div className="flex items-center justify-center px-2">
						{isSubmitting && <Loader type="searching" />}
						{isTyping && (
							<button
								type="button"
								className="lg:text-xl text-2xl text-white cursor-pointer relative top-[1px]"
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
