import React, { useEffect, useState } from 'react'
import TestimonialsBG from '../../assets/images/testimonials-bg.svg'

import Testimonial1 from '../../assets/images/testimonial-1.png'
import Testimonial2 from '../../assets/images/testimonial-2.png'
import Testimonial3 from '../../assets/images/testimonial-3.png'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
function TestimonialsSection() {
    

  const testimonials = [
   
    {
      name: 'Charlie K',
      description: '“I can’t stop using this tool. With so many people canceling tee times, I have my ‘pick of the litter’ on when and where I want to play. Just have to act fast:“',
      image: Testimonial2

    },
    {
      name: 'George P',
      description: `“As someone who plans everything only a few days out, I found myself never golfing due to the fact that every non twilight tee time was always booked. Tee Time Alerts lets me get out at my favorite courses with much less planning“`,
      image: Testimonial1
    }, {
      name: 'John W',
      description: `“Torrey Pines has always been extremely difficult to get a tee time but now I can snag tee times no problem using this tool. Absolute game changer“`,
      image: Testimonial3
    }
  ]


  function ScrollCarousel(direction) {
    const carousel = document.getElementById('carousel-wrapper')
    if (direction == 1 && Number(carousel.style.transform.split('(')[1].split('px')[0]) > 500) return
    if (direction == -1 && Number(carousel.style.transform.split('(')[1].split('px')[0]) < -1000) return
    //translate to the right by 20pw addition 
    console.log(carousel.style.transform.split('(')[1].split('px')[0])
    carousel.style.transform = `translateX(${Number(carousel.style.transform.split('(')[1].split('px')[0]) + (direction * 400)}px)`
  }

  const [width, setWidth] = useState(600);

  const handleIncreaseWidth = () => {
    setWidth(width + 100);
  };

  const handleDecreaseWidth = () => {
    setWidth(width - 100);
  };


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
    //show the third slide initially
    initialSlide: 1,
  };

  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
  }); // Now we pass the reference to the useDraggable hook:

  useEffect(() => {
    if (ref.current) {
      const container = ref.current;
      container.scrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
    }
  }, []);
  const handleScrollLeft = () => {
    if (ref.current) {
      const container = ref.current;
      const targetScrollLeft = container.scrollLeft - container.clientWidth;
      const duration = 500; // 500 milliseconds

      animateScroll(container, 'scrollLeft', container.scrollLeft, targetScrollLeft, duration);
    }
  };

  const handleScrollRight = () => {
    if (ref.current) {
      const container = ref.current;
      const targetScrollLeft = container.scrollLeft + container.clientWidth;
      const duration = 500; // 500 milliseconds

      animateScroll(container, 'scrollLeft', container.scrollLeft, targetScrollLeft, duration);
    }
  };

  const handleScrollMiddle = () => {
    if (ref.current) {
      const container = ref.current;
      const targetScrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
      const duration = 500; // 500 milliseconds

      animateScroll(container, 'scrollLeft', container.scrollLeft, targetScrollLeft, duration);
    }

  }

  const animateScroll = (element, property, startValue, endValue, duration) => {
    const startTime = performance.now();

    const animationLoop = (currentTime) => {
      const timeElapsed = currentTime - startTime;

      if (timeElapsed >= duration) {
        element[property] = endValue;
        return;
      }

      const easing = easeInOutQuad(timeElapsed, startValue, endValue - startValue, duration);
      element[property] = easing;

      requestAnimationFrame(animationLoop);
    };

    requestAnimationFrame(animationLoop);
  };

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  const [selectedTestimonialCard, setSelectedTestimonialCard] = useState(1)

  return (
    <div>      <div style={{ height: '50px', background: "rgba(3, 49, 75, 1)", borderTopRightRadius: "100%", borderTopLeftRadius: '100%' }} ></div>
    <div className='testimonials' >
      <div className=' alert-title ' style={{ color: 'white', width: 'fit-content', margin: 'auto', paddingBlock: '75px' }} > What Golfers Are Saying </div>
      <div id={'carousel-wrapper'} className='carousel-wrapper transition duration-500 ease-in-out scrollbar-hide'
        style={{ display: 'flex' }}
        {...events}
        ref={ref}
      >
        {
          testimonials.map((testimonial, index) => {
            return <div key={index} className='bg-white rounded shadow-lg
             transition duration-500 ease-in-out  testimonial-card-drag
            '
              onMouseDown={() => {
                setSelectedTestimonialCard(index)
                if (index == 0) handleScrollLeft()
                else if (index == 1) handleScrollMiddle()
                else if (index == 2) handleScrollRight()
              }}

              style={{ background: (index == selectedTestimonialCard) ? 'white' : '#a7b4bd' }} >
              <div className='testimonial-description' >{testimonial.description}</div>
              <div className='testimonial-name w-fit m-auto mt-[15px]' >{testimonial.name}</div>
              <img src={testimonial.image} style={{ filter: index == selectedTestimonialCard ? 'brightness(1)' : 'brightness(0.5)', }} alt="testimonial" className='rounded-full border-2 border-green-500 ml-auto testimonial-image ' width='60' />
            </div>
          })
        }
      </div>

    </div>
    {/* <BsChevronLeft onClick={handleScrollLeft} style={{ fontSize: '60px', opacity: '0.5', color: 'black', cursor: 'pointer', position: 'absolute', height: '200px', zIndex: '1', left: '10%', marginTop: '-150px' }} />
    <BsChevronRight onClick={handleScrollRight} style={{ fontSize: '60px', opacity: '0.5', color: 'black', cursor: 'pointer', position: 'absolute', height: '200px', zIndex: '1', right: '10%', marginTop: '-150px' }} />  */}
</div>
  )
}

export default TestimonialsSection