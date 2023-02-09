import Button from '@components/UI/Button';
import { BsChatLeftDots, BsInstagram, BsPrinter } from 'react-icons/bs';

function Widget() {
	return (
		<h3 className="min-h-[400px] border py-10 px-10">
			<Button>Follow Instagram</Button>
			<Button className="w-full">Follow Instagram</Button>
			<Button
				icon={{ left: <BsInstagram /> }}
				className="lgSize"
			>
				Follow Instagram
			</Button>

			<Button className="primary">Follow Instagram</Button>
			<Button className="tag">Follow Instagram</Button>
		</h3>
	);
}

export default Widget;
