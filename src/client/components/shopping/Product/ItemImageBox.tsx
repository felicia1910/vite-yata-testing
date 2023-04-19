import {
  KeenSliderInstance,
  KeenSliderPlugin,
  useKeenSlider,
} from "keen-slider/react";
import Image from "next/image";
import React, { MutableRefObject, useState } from "react";
import ImageSliderArrow from "./ImageSliderArrow";

const ThumbnailPlugin = (
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin => {
  return (slider) => {
    const removeActive = () => {
      slider.slides.forEach((slide) => slide.classList.remove("active"));
    };

    const addActive = (idx: number) => {
      slider.slides[idx].classList.add("active");
    };

    const addClickEvents = () => {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    };

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(next);
      });
    });
  };
};

type Props = {
  plu: string;
  images: { images_url: string }[];
};

export default function ItemImageBox({ plu, images }: Props) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    defaultAnimation: {
      duration: 1000,
    },
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      initial: 0,
      slides: { perView: 5, spacing: 4 },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <div className='lg:w-full lg:max-w-[24rem]'>
        <div
          className={
            "relative flex items-center mb-3 overflow-hidden border border-dotted rounded-2xl lg:mt-3 lg:w-full lg:aspect-square h-60 lg:h-auto border-yata-brown " +
            (images.length == 0 ? "bg-grey" : "")
          }
        >
          {images.length > 0 && (
            <div
              ref={sliderRef}
              className='w-full overflow-hidden h-60 lg:h-auto rounded-2xl keen-slider'
            >
              {images.map((image, idx) => (
                <div
                  className='flex items-center justify-center w-full keen-slider__slide'
                  key={"product-img-" + idx}
                >
                  <div className='relative h-full lg:w-full lg:h-auto aspect-square'>
                    <Image
                      src={image.images_url}
                      alt={image.images_url}
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {images.length > 1 && loaded && instanceRef.current && (
            <>
              <ImageSliderArrow
                left
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                disabled={currentSlide === 0}
              />

              <ImageSliderArrow
                onClick={(e: any) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </div>

      {/* Slider pagination in mobile view */}
      <div className='lg:hidden'>
        {loaded && images.length > 0 && instanceRef.current && (
          <div className='flex justify-center py-3'>
            {instanceRef.current.track.details &&
              instanceRef.current.track.details.slides &&
              instanceRef.current.track.details.slides.length > 0 &&
              [
                ...Array(
                  instanceRef.current.track.details.slides.length
                ).keys(),
              ].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx);
                      setCurrentSlide(idx);
                    }}
                    className={
                      "border-0 min-w-[0.5rem] w-2 h-2 rounded-full mr-2 cursor-pointer transition-colors ease-in-out duration-300 " +
                      (currentSlide === idx ? "bg-yata" : " bg-[#B49D86]")
                    }
                  />
                );
              })}
          </div>
        )}
      </div>

      <div className='hidden w-full h-20 mb-3 overflow-hidden lg:block lg:max-w-[24rem] '>
        {images.length > 0 && (
          <div
            ref={thumbnailRef}
            className='w-full h-full max-w-md keen-slider thumbnail'
          >
            {images.map((image, idx) => (
              <div
                key={"product-img-thumbnail-" + idx}
                className={
                  "flex items-center justify-center overflow-hidden rounded-lg cursor-pointer keen-slider__slide " +
                  (currentSlide === idx
                    ? "border-yata-deep border-dotted border-2 "
                    : "border ")
                }
                onClick={() => setCurrentSlide(idx)}
              >
                <div className='relative w-full aspect-square'>
                  <Image
                    src={image.images_url}
                    alt={image.images_url}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='mx-2 my-1 underLg:hidden'>
        <h1 className='text-sm'>產品編號: {plu}</h1>
      </div>
    </>
  );
}
