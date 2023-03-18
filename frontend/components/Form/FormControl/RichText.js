import { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Label from './Label';

const ReactQuill = dynamic(
	() => {
		return import('react-quill');
	},
	{ ssr: false }
);

const RichTextField = forwardRef(
	({ field, label, required, info, ...props }, ref) => {
		return (
			<div className="flex flex-col !text-base">
				<Label
					label={label}
					info={info}
				/>
				<ReactQuill
					theme="snow"
					{...field}
					ref={ref}
					// className="lg:h-[80%] md:h-[70%] h-[80%]"
					{...props}
					modules={{
						toolbar: [
							[{ header: [4, 5, 6, false] }],
							['bold', 'italic', 'underline', 'clean'],
							[{ color: [] }],
							['blockquote', 'code-block'],
							[{ align: [] }],
							[{ list: 'ordered' }, { list: 'bullet' }],
							['link'],
							[{ script: 'sub' }, { script: 'super' }],
						],
					}}
					formats={[
						'header',
						'italic',
						'underline',
						'bold',
						'clean',
						'list',
						'ordered',
						'link',
						'blockquote',
						'code-block',
						'align',
						'script',
						'color',
					]}
				/>
			</div>
		);
	}
);

export default RichTextField;
