import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { HiInformationCircle } from 'react-icons/hi';

const Label = ({ label, name, info, required }) => {
	return (
		<div className="flex gap-1 items-center">
			<div className="flex gap-1">
				{label && (
					<label
						className="block text-black text-base font-medium mb-[2px] tracking-wider"
						htmlFor={name}
					>
						{label}
						{required && (
							<span className="text-red ml-1 font-bold">*</span>
						)}
					</label>
				)}
			</div>
			{info && (
				<Tippy
					content={info.content}
					placement={info.placement || 'auto'}
				>
					<button
						className="relative -top-[1px] text-primaryDark "
						type="button"
					>
						<HiInformationCircle />
					</button>
				</Tippy>
			)}
		</div>
	);
};

export default Label;
