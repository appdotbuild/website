'use client';

import Image, { StaticImageData } from 'next/image';

import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import ChevronIcon from '@/svgs/chevron.inline.svg';

type Author = {
  name: string;
  company: string;
  image: StaticImageData;
  logo: StaticImageData;
};

type SliderItem = {
  text: JSX.Element;
  author: Author;
};

type TestimonialsSliderProps = {
  items: SliderItem[];
};

function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  const sliderRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const handleScrollButton = (direction: 'left' | 'right') => () => {
    if (!sliderRef.current) {
      return;
    }

    const container = sliderRef.current;

    // Get the first item's width as a reference
    const firstItem = container.querySelector('li');
    if (!firstItem) {
      return;
    }

    const itemWidth = firstItem.offsetWidth;
    const targetScroll =
      direction === 'left' ? container.scrollLeft - itemWidth : container.scrollLeft + itemWidth;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container relative flex justify-center">
      <button
        className="group absolute bottom-[-70px] left-1/2 flex size-8 shrink-0 translate-x-[-50px] items-center justify-center rounded-full bg-gray-12 transition-colors hover:bg-gray-20 disabled:bg-gray-8 md:relative md:bottom-0 md:left-0 md:mt-28 md:translate-x-0 lg:mt-[70px] lg:size-9 xl:mt-[60px]"
        disabled={!canScrollLeft}
        onClick={handleScrollButton('left')}
      >
        <span className="sr-only">Previous</span>
        <ChevronIcon
          className="h-3 w-1.5 text-gray-70 transition-colors group-hover:text-gray-98 group-disabled:text-gray-20 lg:h-3.5 lg:w-2"
          aria-hidden
        />
      </button>
      <ul
        className="scrollbar-hidden -mx-5 inline-flex w-auto snap-x snap-mandatory overflow-x-scroll [mask-image:linear-gradient(to_left,transparent_0%,#fff_5%,#fff_95%,transparent_100%)] after:relative after:flex after:w-full after:snap-end after:content-[''] md:mx-0 lg:w-[890px]"
        ref={sliderRef}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <li className="w-full shrink-0 snap-end" key={index}>
            <figure className="px-5 sm:px-8 lg:px-[93px]">
              <blockquote>
                <p className="text-center text-20 font-medium leading-snug -tracking-tightest text-gray-70 md:text-28 lg:text-32 [&_span]:font-title [&_span]:font-normal [&_span]:italic [&_span]:tracking-tight [&_span]:text-white">
                  “{item.text}”
                </p>
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-center gap-2 md:mt-6">
                <div className="flex items-center">
                  {item.author.logo && (
                    <Image
                      className="size-7 rounded-full ring-1 ring-gray-12 md:size-[34px] lg:size-[38px]"
                      src={item.author.logo}
                      alt=""
                      width={38}
                      height={38}
                      sizes="76px"
                      quality={100}
                    />
                  )}
                  <Image
                    className={cn(
                      'size-7 rounded-full ring-1 ring-gray-12 md:size-[34px] lg:size-[38px]',
                      item.author.logo && 'ml-[-15px]',
                    )}
                    src={item.author.image}
                    alt=""
                    width={38}
                    height={38}
                    sizes="76px"
                    quality={100}
                  />
                </div>
                <p className="text-14 leading-snug -tracking-tighter text-gray-94 md:text-16 lg:text-18">
                  {item.author.name}
                  {item.author.company && `, ${item.author.company}`}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <button
        className="group absolute bottom-[-70px] right-1/2 flex size-8 shrink-0 translate-x-[50px] items-center justify-center rounded-full bg-gray-12 transition-colors hover:bg-gray-20 disabled:bg-gray-8 md:relative md:bottom-0 md:right-0 md:mt-28 md:translate-x-0 lg:mt-[70px] lg:size-9 xl:mt-[60px]"
        disabled={!canScrollRight}
        onClick={handleScrollButton('right')}
      >
        <span className="sr-only">Next</span>
        <ChevronIcon
          className="h-3 w-1.5 rotate-180 text-gray-70 transition-colors group-hover:text-gray-98 group-disabled:text-gray-20 lg:h-3.5 lg:w-2"
          aria-hidden
        />
      </button>
    </div>
  );
}

export default TestimonialsSlider;
