"use client"

import { HandMetal, Link } from 'lucide-react';
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import Image from 'next/image'; // Use next/image for optimization
import background from '@/image/Group 2.png'; // Importing image
import { div } from 'framer-motion/client';

function Navbar() {
    return (
        <div className='flex flex-col gap-44 justify-center items-center w-[1000px] h-[780px]  p-6 '>
            {/* <h2 className='text-white -top-[40px] text-9xl mb-8 font-extrabold size-36 relative font-fantasy -left-[165px]'>
                Project Pro</h2> */}
            <Image
                src={background}
                width={1200}
                height={1200}
                alt='background'
                className='relavite right-0'
            />
        </div>
    );
}

export default Navbar;
