import { useKeenSlider } from 'keen-slider/react';
import Img from '../Image';
import 'keen-slider/keen-slider.min.css';

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
				slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
			});
		});
	};
}

function Thumbnail({ images }) {
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
	});

	const [thumbnailRef] = useKeenSlider(
		{
			initial: 0,
			slides: {
				perView: 3,
				spacing: 10,
			},
			breakpoints: {
				'(min-width: 768px)': {
					slides: { perView: 4, spacing: 16 },
				},
				'(min-width: 1024px)': {
					slides: { perView: 5, spacing: 24 },
				},
			},
		},
		[ThumbnailPlugin(instanceRef)]
	);
	return (
		<>
			<div
				ref={sliderRef}
				className="keen-slider"
			>
				{images.map((img) => (
					<div
						className="keen-slider__slide"
						key={img.id}
					>
						<Img
							src={img.image_url}
							alt={img.caption}
							className="md:w-1/2  h-60 mx-auto"
						/>
					</div>
				))}
			</div>

			<div
				ref={thumbnailRef}
				className="keen-slider thumbnail mt-6 justify-center"
			>
				{images.map((img) => (
					<div
						className="keen-slider__slide rounded border-border"
						key={img.id}
					>
						<Img
							src={img.image_url}
							alt={img.caption}
							className="h-24"
							cover
						/>
					</div>
				))}
			</div>
		</>
	);
}

export default Thumbnail;
