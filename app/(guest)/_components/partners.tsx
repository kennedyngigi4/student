import React from 'react';
import { Carousel, CarouselItem, CarouselContent } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';


const Partners = () => {

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    const partners = [
        {
            company: 1,
            logo: "/images/partners/1.svg",
        },
        {
            company: 2,
            logo: "/images/partners/2.svg",
        },
        {
            company: 3,
            logo: "/images/partners/3.svg",
        },
        {
            company: 4,
            logo: "/images/partners/4.svg",
        },
        {
            company: 5,
            logo: "/images/partners/5.svg",
        },
        {
            company: 6,
            logo: "/images/partners/6.svg",
        },
        {
            company: 7,
            logo: "/images/partners/7.svg",
        },
        {
            company: 8,
            logo: "/images/partners/8.svg",
        },
        {
            company: 9,
            logo: "/images/partners/9.svg",
        },
        {
            company: 10,
            logo: "/images/partners/10.svg",
        }
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
                    {partners.map((partner) => (
                        <CarouselItem key={partner.company} className="md:basis-1/2 lg:basis-1/6">
                            <div className="p-1">
                                <Image src={partner.logo} width={100} height={200} alt={partner.logo} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>
        </>
    )
}

export default Partners