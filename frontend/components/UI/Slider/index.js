import { useCallback, useEffect, useState } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import ArrowBtn from './ArrowBtn';
import Pagination from './Pagination';
import { SLIDES_ON_DESKTOP } from '@utils/constants';

function Slider({ children }) {
	const [loaded, setLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [sliderRef, instanceRef] = useKeenSlider({
		breakpoints: {
			'(min-width: 768px)': {
				slides: { perView: 2, spacing: 16 },
			},
			'(min-width: 1024px)': {
				slides: { perView: SLIDES_ON_DESKTOP, spacing: 24 },
			},
		},
		slides: { perView: 1 },
		created: () => {
			setLoaded(true);
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
	});

	const handleNext = useCallback(() => {
		instanceRef.current?.next();
	}, [loaded, instanceRef]);

	const handlePrev = useCallback(() => {
		instanceRef.current?.prev();
	}, [loaded, instanceRef]);

	useEffect(() => {
		const handleKeyPress = (e) => {
			loaded && e.key === 'ArrowRight' && handleNext();
			loaded && e.key === 'ArrowLeft' && handlePrev();
		};
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [loaded]);

	return (
		<section className="container mt-10 relative">
			<div
				ref={sliderRef}
				className="keen-slider"
			>
				{children}
				{loaded && children.length > SLIDES_ON_DESKTOP && (
					<>
						<ArrowBtn
							onClick={handlePrev}
							disabled={currentSlide === 0}
						/>
						<ArrowBtn
							right
							onClick={handleNext}
							disabled={
								currentSlide ===
								children.length - SLIDES_ON_DESKTOP
							}
						/>
					</>
				)}
			</div>
			{loaded && (
				<Pagination
					dots={instanceRef.current?.track.details?.slides.length}
					currentSlide={currentSlide}
					handleGoTo={instanceRef.current?.moveToIdx}
				/>
			)}
		</section>
	);
}

export default Slider;
