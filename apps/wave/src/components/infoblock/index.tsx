'use client';
import { useState, useRef, useCallback } from 'react';
import InfoBlock from './components/InfoBlock';

const InfoBlockCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const totalSlides = 2;
	const sliderRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLElement>) => {
			const slideWidth = (e.currentTarget as HTMLDivElement).offsetWidth;
			const scrollLeft = (e.currentTarget as HTMLDivElement).scrollLeft;
			setCurrentSlide(Math.round(scrollLeft / slideWidth));
			console.log(currentSlide);
		},
		[currentSlide]
	);

	const handleDotClick = useCallback((index: number) => {
		if (sliderRef.current) {
			const slideWidth = sliderRef.current.offsetWidth;
			sliderRef.current.scrollLeft = slideWidth * index;
			console.log(index);
		}
	}, []);

	return (
		<>
			<div
				ref={sliderRef}
				onScroll={handleScroll}
				className='hide-scroll flex snap-x snap-mandatory justify-between overflow-auto py-1'
			>
				<InfoBlock />
				<InfoBlock />
				<InfoBlock />
				<InfoBlock />
			</div>
			<div className='invisible mt-2 flex justify-center space-x-2 md:visible'>
				{Array(totalSlides)
					.fill()
					.map((_, i) => (
						<div
							key={i}
							onClick={() => handleDotClick(i)}
							className={`h-2 w-2 cursor-pointer rounded-full ${currentSlide === i ? 'bg-gray-500' : 'bg-gray-300'}`}
						></div>
					))}
			</div>
		</>
	);
};

export default InfoBlockCarousel;
