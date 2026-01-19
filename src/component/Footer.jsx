import React from 'react'
import { BsDiscord } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const links = [
    {href: 'https://discord.com', icon: <BsDiscord />},
    {href: 'https://twitter.com', icon: <FaTwitter />},
    {href: 'https://instagram.com', icon: <FaInstagram />},
    {href: 'https://youtube.com', icon: <FaYoutube />},

]

const Footer = () => {
  return (
    <div className='w-screen bg-violet-300 py-4 text-black'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
            <p className='text-center text-sm md:text-left'>&copy; JM 2026. All rights reserved</p>
            <div className='flex justify-center gap-4 md:justify-start'>
                {links.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className='text-black transition-colors duration-500 ease-in-out hover:text-white'>
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Footer;