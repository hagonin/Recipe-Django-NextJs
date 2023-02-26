import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { HiInformationCircle } from 'react-icons/hi';

const Label = ({ label, name, info }) => {
	return (
		<div className="flex gap-2 items-center">
			<div className="flex gap-1">
				{label && (
					<label
						className="block text-black text-lg font-semibold mb-2"
						htmlFor={name}
					>
						{label}
					</label>
				)}
			</div>
			{info && (
				<Tippy
					content={info.content}
					placement={info.placement || 'top'}
				>
					<button className="relative -top-1 text-primaryDark">
						<HiInformationCircle />
					</button>
				</Tippy>
			)}
		</div>
	);
};

export default Label;
