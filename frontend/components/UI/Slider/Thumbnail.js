import { useKeenSlider } from 'keen-slider/react';
import Img from '../Image';
import 'keen-slider/keen-slider.min.css';
import { useState } from 'react';

function ThumbnailPlugin(mainRef) {
	return (slider) => {
		function removeActive() {
			slider.slides.forEach((slide) => {
				slide.classList.remove('active');
			});
		}
		function addActive(idx) {
			slider.slides[idx].classList.add('active');
		}

		function addClickEvents() {
			slider.slides.forEach((slide, idx) => {
				slide.addEventListener('click', () => {
					if (mainRef.current) mainRef.current.moveToIdx(idx);
				});
				
			});
		}
		

		slider.on('created', () => {
			if (!mainRef.current) return;
			addActive(slider.track.details.rel);
			addClickEvents();
			mainRef.current.on('animationStarted', (main) => {
				removeActive();
				const next = main.animator.targetIdx || 0;
				addActive(main.track.absToRel(next));
				// slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
			});
		});
	};
}

function Thumbnail({
	images,
	slideOnMobile = 3,
	slideOnTablet = 4,
	slideOnPc = 6,
}) {
	const [indexCurrent, setIndexCurrent] = useState(0);
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		slideChanged: (slider) => {
			setIndexCurrent(slider.track.details.rel);
		},
	});

	const [thumbnailRef] = useKeenSlider(
		{
			initial: 0,
			breakpoints: {
				'(max-width: 768px)': {
					slides: { perView: slideOnMobile, spacing: 8 },
				},
				'(min-width: 768px)': {
					slides: { perView: slideOnTablet, spacing: 12 },
				},
				'(min-width: 1024px)': {
					slides: { perView: slideOnPc, spacing: 16 },
				},
			},
		},
		[ThumbnailPlugin(instanceRef)]
	);
	return (
		<>
			<div
				ref={sliderRef}
				className="keen-slider mt-6"
			>
				{images.map((img, index) => (
					<div
						className="keen-slider__slide"
						key={index}
					>
						<Img
							src={img.image}
							alt='recipe'
							className="h-72 w-full mx-auto "
						/>
					</div>
				))}
			</div>

			<div
				ref={thumbnailRef}
				className="keen-slider thumbnail mt-6 border-y py-2 bg-third"
			>
				{images.map((img, index) => (
					<div
						className={`keen-slider__slide rounded border-2 md:h-20 h-24 cursor-pointer ${
							indexCurrent === index ? 'border-primary' : ''
						}`}
						key={index}
					>
						<Img
							src={img.image}
							alt='recipe'
							className="h-full rounded-md"
							cover
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default Thumbnail;
