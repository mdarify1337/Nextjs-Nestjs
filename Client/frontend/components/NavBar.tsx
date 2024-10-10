"use client"

import { HandMetal, Link } from 'lucide-react';
import React from 'react';
import { Button, buttonVariants } from './ui/button';
import Image from 'next/image'; // Use next/image for optimization
import background from '@/image/Group 2.png'; // Importing image
import { div } from 'framer-motion/client';

function Navbar() {
    return (
        <div className='flex flex-col gap-16 mb-6 justify-center items-center w-[650px] h-[700px]'>
            <h2 className='text-white -top-[75px] text-9xl mb-8 font-extrabold size-36 relative font-fantasy -left-[155px]'>
                Project Pro</h2>
            <Image
                src={background}
                width={500}
                height={600}
                alt='background'
            />
        </div>
    );
}

export default Navbar;
