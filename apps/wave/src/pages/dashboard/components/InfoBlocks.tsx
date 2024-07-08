'use client';

import { useState, useRef, useCallback, useLayoutEffect, useMemo } from 'react';
import InfoBlock from './InfoBlock';
import { useDevice } from '~/hooks/device';
import { EnumDeviceType } from '~/constants/enums';

const SLIDES = [
	{ id: 1, title: 'Slide 1' },
	{ id: 2, title: 'Slide 2' },
	{ id: 3, title: 'Slide 3' },
	{ id: 4, title: 'Slide 4' },
	{ id: 5, title: 'Slide 5' },
	{ id: 6, title: 'Slide 6' },
];

const InfoBlockCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const [isDesktop, setIsDesktop] = useState<boolean>();
	const sliderRef = useRef<HTMLDivElement>(null);

	const device = useDevice();

	useLayoutEffect(() => {
		setIsDesktop(device === EnumDeviceType.DESKTOP);
	}, [device]);

	const totalSlides = useMemo(() => {
		const total = Math.floor((SLIDES.length - 1) / (isDesktop ? 3 : 2));
		return Array(total)
			.fill(0)
			.map((page) => page);
	}, [isDesktop]);

	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLElement>) => {
			if (!isScrolling) {
				const { scrollLeft, offsetWidth } = e.currentTarget as HTMLDivElement;
				setCurrentSlide(Math.round(scrollLeft / offsetWidth));
			}
		},
		[isScrolling]
	);

	const handleDotClick = useCallback((index: number) => {
		if (sliderRef.current) {
			const slideWidth = sliderRef.current.offsetWidth;
			setIsScrolling(true);
			sliderRef.current.scrollLeft = slideWidth * index;
			setCurrentSlide(index);
			setTimeout(() => setIsScrolling(false), 300);
		}
	}, []);

	return (
		<>
			<div
				ref={sliderRef}
				onScroll={handleScroll}
				className='hide-scroll flex snap-x snap-mandatory justify-between overflow-auto py-1'
			>
				{SLIDES.map((slide) => (
					<div key={slide.id}>
						<InfoBlock />
					</div>
				))}
			</div>
			<div className='invisible mt-2 flex justify-center space-x-2 md:visible'>
				{totalSlides.map((page) => (
					<div
						key={page}
						onClick={() => handleDotClick(page)}
						onKeyDown={() => handleDotClick(page)}
						className={`h-2 w-2 cursor-pointer rounded-full ${currentSlide === page ? 'bg-gray-500' : 'bg-gray-300'}`}
						tabIndex={0}
						role='button'
						aria-label={`Go to ${page + 1}`}
					/>
				))}
			</div>
		</>
	);
};

export default InfoBlockCarousel;
