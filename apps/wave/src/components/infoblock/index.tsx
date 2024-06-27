'use client';
import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import InfoBlock from './components/InfoBlock';
import { useDevice } from '~root/hooks/device';
import { EnumDeviceType } from '~enums';

const InfoBlockCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const [isDesktop, setIsDesktop] = useState<boolean>();
	const sliderRef = useRef<HTMLDivElement>(null);

	const device = useDevice();

	useLayoutEffect(() => {
		setIsDesktop(device === EnumDeviceType.DESKTOP);
	}, [device]);

	const slides = [
		<InfoBlock />,
		<InfoBlock />,
		<InfoBlock />,
		<InfoBlock />,
		<InfoBlock />,
		<InfoBlock />,
		<InfoBlock />,
		<InfoBlock />,
	]; // Will come from DB

	const totalSlides = Math.floor((slides.length - 1) / (isDesktop ? 3 : 2));

	const handleScroll = useCallback(
		(e: React.UIEvent<HTMLElement>) => {
			if (!isScrolling) {
				const slideWidth = (e.currentTarget as HTMLDivElement).offsetWidth;
				const scrollLeft = (e.currentTarget as HTMLDivElement).scrollLeft;
				setCurrentSlide(Math.round(scrollLeft / slideWidth));
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
				{slides.map((slide, index) => (
					<div key={index}>{slide}</div>
				))}
			</div>
			<div className='invisible mt-2 flex justify-center space-x-2 md:visible'>
				{Array(totalSlides)
					.fill()
					.map((_, i) => (
						<div
							key={i}
							onClick={() => handleDotClick(i)}
							onKeyDown={() => handleDotClick(i)}
							className={`h-2 w-2 cursor-pointer rounded-full ${currentSlide === i ? 'bg-gray-500' : 'bg-gray-300'}`}
							tabIndex={0}
							role='button'
							aria-label={`Go to ${i + 1}`}
						/>
					))}
			</div>
		</>
	);
};

export default InfoBlockCarousel;
