import Img from '@components/UI/Image';
import { images } from '@utils/constants';
import { BsPhone } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

function Banner() {
	return (
		<section className="container my-10 min-h-[100px] rounded-md overflow-hidden relative">
			<Img
				src={images.contact}
				alt="banner"
				className="h-[250px] w-full"
				cover
			/>
			<div className="text-center rounded-md bg-[rgba(255,255,255,0.9)] px-3 py-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid md:grid-cols-2 grid-cols-1 lg:w-1/2 w-4/5">
				<span className="md:border-r md:border-blackLight">
					RECIPE Chemicals <br /> + Instruments GmbH
				</span>
				<div>
					<span className="flex items-center gap-2 justify-center">
						<BsPhone /> +49 89 54 70 81 - 0
					</span>
					<span className="flex items-center gap-2 justify-center">
						<MdEmail /> homecook@recipe.com
					</span>
				</div>
			</div>
		</section>
	);
}

export default Banner;
