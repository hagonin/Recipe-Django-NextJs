import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { images } from '@utils/constants';

import Img from '../UI/Image';
import ArrowBtn from './ArrowBtn';
import Pagination from './Pagination';

function Slider({
	list = [
		{
			id: 1,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 2,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		},
		{
			id: 3,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		},
		{
			id: 4,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 5,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			id: 6,
			name: 'Seafood paella',
			image: null,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
	],
}) {
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

	const handleKeyPress = useCallback(
		(e) => {
			loaded && e.key === 'ArrowRight' && instanceRef.current?.next();
			loaded && e.key === 'ArrowLeft' && instanceRef.current?.prev();
		},
		[loaded, handleNext, handlePrev]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return (
		<section className="container mt-14 relative">
			<div
				ref={sliderRef}
				className="keen-slider"
			>
				{list.map((item) => (
					<Link
						key={item.id}
						href="/recipes/seafood"
						className="keen-slider__slide  rounded relative group"
					>
						<span className="absolute inset-0 bg-[rgba(255,255,255,0.35)] z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
						<Img
							src={item.image || images.recipe1}
							alt={`slide ${item.id}`}
							className="w-full h-[500px]"
							cover
						/>
						<div className="absolute bottom-0 left-0 w-full z-20 bg-primaryTransparent text-center py-3 px-5">
							<span className="text-[1.35rem] text-white">
								{item.name}
							</span>
							<p className="leading-6 text-white mt-1 ">
								{item.description}
							</p>
						</div>
					</Link>
				))}
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
					dots={instanceRef.current?.track.details.slides.length}
					currentSlide={currentSlide}
					handleGoTo={instanceRef.current?.moveToIdx}
				/>
			)}
		</section>
	);
}

export default Slider;
