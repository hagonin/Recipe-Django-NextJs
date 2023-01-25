import Button from '@components/UI/Button';
import { BsChatLeftDots, BsInstagram, BsPrinter } from 'react-icons/bs';

function SideBar() {
	return (
		<h3 className="min-h-[400px] border">
			<Button
				iconLeft={<BsInstagram />}
				size="lg"
			>
				Follow Instagram
			</Button>
			<Button>Chocolate</Button>
			<Button full>Subcribe</Button>
			<Button primary>Subcribe</Button>
			<Button iconLeft={<BsPrinter />}>Print Recipe</Button>
			<div className="flex items-center gap-3">
				{['dinner', 'breakfast', 'meal'].map((item) => (
					<Button
						size="small"
						secondary
					>
						{item}
					</Button>
				))}
			</div>
			<Button
				size="small"
				secondary
			>
				Reply
			</Button>
		</h3>
	);
}

export default SideBar;
