import { ArrowRight } from 'lucide-react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

    const paymentLogos = [
        {
            name: "1",
            logo: "/images/payments/1.png"
        },
        {
            name: "2",
            logo: "/images/payments/2.png"
        },
        {
            name: "6",
            logo: "/images/payments/6.png"
        },
        {
            name: "5",
            logo: "/images/payments/5.png"
        },
        {
            name: "3",
            logo: "/images/payments/3.png"
        },
        {
            name: "4",
            logo: "/images/payments/4.png"
        },
        {
            name: "7",
            logo: "/images/payments/7.png"
        }
    ]

    

  return (
    <>
        <section className="grid sm:grid-cols-12 grid-cols-1 gap-x-12 py-8 text-white bg-isky_blue w-full md:px-20 px-10">
            
            <a href="https://wa.me/971506044114" className="whatsapp-btn" target="_blank">WhatsApp Us</a>
            
            <div className="md:col-span-6 sm:col-span-7">
                <Image src="/white-logo.png" width={200} height={100} alt="ISKY TECH" className="" />

                <div className="mt-10">
                    <h1 className="font-semibold sm:text-3xl text-xl pb-4 font-bubblegum">Where Young Creators Become Tech Innovators</h1>
                    <div className="flex items-center gap-6">
                        <Link href="">
                            <FaFacebookF className='h-6 w-6' />
                        </Link>
                        <Link href="">
                            <FaXTwitter className='h-6 w-6'  />
                        </Link>
                        <Link href="">
                            <FaInstagram className='h-6 w-6' />
                        </Link>
                        <Link href="">
                            <FaYoutube className='h-6 w-6' />
                        </Link>
                        <Link href="">
                            <FaLinkedinIn className='h-6 w-6' />
                        </Link>
                        <Link href="">
                            <FaTiktok className='h-6 w-6' />
                        </Link>
                        <Link href="">
                            <FaWhatsapp className='h-6 w-6' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="md:col-span-3 md:block hidden">
                
            </div>
            <div className="md:col-span-3 sm:col-span-5 max-sm:pt-6">
                <h1 className="font-extrabold font-lato max-sm:text-xl">Company</h1>
                <div className="flex flex-col space-y-3 md:mt-6">
                      <Link className="flex" href="/about-us"><ArrowRight className="h-4 w-4 mt-1 mr-2" /> About Us</Link>
                    <Link className="flex" href="/why-isky"><ArrowRight className="h-4 w-4 mt-1 mr-2" /> Why ISKY</Link>
                    <Link className="flex" href="/blogs"><ArrowRight className="h-4 w-4 mt-1 mr-2" /> Blogs</Link>
                    <Link className="flex" href=""><ArrowRight className="h-4 w-4 mt-1 mr-2" /> Privacy Policy</Link>
                    <Link className="flex" href=""><ArrowRight className="h-4 w-4 mt-1 mr-2" /> Terms and Conditions</Link>
                </div>
            </div>
        </section>
        <section className="bg-white flex md:flex-row flex-col justify-between items-center md:px-20 px-10 py-6">
            <div>
                  <p className=""><span className="max-md:text-2xl">&copy; 2025 <span className="font-semibold">ISKY TECH</span></span> &bull; All Rights Reserved</p>
            </div>
            <div className="flex flex-row space-x-3 items-center max-md:pt-5">
                {paymentLogos.map((logo) => (
                    <div className="" key={logo.name}>
                        <Image src={logo.logo} width={38} height={10} alt={logo.name} />
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default Footer