import React from 'react';
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image';

const Testimonials = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );


    const comments = [
        {
            id: 1,
            image: "/images/testimonials/1.png"
        },
        {
            id: 6,
            image: "/images/testimonials/6.png"
        },
        {
            id: 2,
            image: "/images/testimonials/2.png"
        },
        {
            id: 7,
            image: "/images/testimonials/7.png"
        },
        {
            id: 3,
            image: "/images/testimonials/3.png"
        },
        {
            id: 8,
            image: "/images/testimonials/8.png"
        },
        {
            id: 4,
            image: "/images/testimonials/4.png"
        },
        {
            id: 9,
            image: "/images/testimonials/9.png"
        },
        {
            id: 5,
            image: "/images/testimonials/5.png"
        },
        {
            id: 10,
            image: "/images/testimonials/10.png"
        },
    ]

  return (
    <>
          <Carousel
              plugins={[plugin.current]}
              opts={{
                  align: "start",

              }}
              className="w-full"
          >
              <CarouselContent>
                  {comments.map((comment) => (
                      <CarouselItem key={comment.id} className="md:basis-1/2 lg:basis-1/3">
                          <div className="">
                              <Image src={comment.image} width={900} height={540} alt="Testimonials" />
                          </div>
                      </CarouselItem>
                  ))}
              </CarouselContent>

          </Carousel>
    </>
  )
}

export default Testimonials