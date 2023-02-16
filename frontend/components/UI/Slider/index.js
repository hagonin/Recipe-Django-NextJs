import { useCallback, useEffect, useState } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import ArrowBtn from './ArrowBtn';
import Pagination from './Pagination';

function Slider({ children }) {
	const [loaded, setLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [sliderRef, instanceRef] = useKeenSlider({
		loop: true,
		breakpoints: {
			'(min-width: 768px)': {
				slides: { perView: 2, spacing: 16 },
			},
			'(min-width: 1024px)': {
				slides: { perView: 3, spacing: 24 },
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

	const handleNext = useCallback(instanceRef.current?.next, [
		loaded,
		instanceRef,
	]);

	const handlePrev = useCallback(instanceRef.current?.prev, [
		loaded,
		instanceRef,
	]);

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
		<section className="container mt-14 relative">
			<div
				ref={sliderRef}
				className="keen-slider"
			>
				{children}
				{loaded && (
					<>
						<ArrowBtn onClick={handlePrev} />
						<ArrowBtn
							right
							onClick={handleNext}
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
