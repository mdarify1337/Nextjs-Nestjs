"use client"
import Navbar from '@/components/NavBar';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
// import background from '@/image/DALL·E 2024-10-03 15.14.00 - A halftone dot gradient similar to the top left quadrant of a retro halftone pattern. The dots start large and gradually decrease in size as they move 2 1 (1).png'
import { div } from 'framer-motion/client';
import logo from '@/image/Artboard 1@2x 1.png'
// import { Button } from '@/components/ui/button';
import background from '@/image/Group 2.png'; 
import { Button } from '@/components/ui/button';
import '../style.css';
import Localpage from '@/components/localpage';


interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-row gap-4  p-4 h-fit rounded-sm bg-[#30324D] justify-center w-fit items-center'>
      <div className=' right-0 backgroundbody rounded-md w-[50%] h-full hidden lg:block  flex-col'>
          <div className='flex flex-row  w-full h-12 relative'>
            <h2 className='text-white  text-3xl mb-8 font-extrabold  mt-3 ml-4 font-fantasy '>
                Project Pro</h2>
            <Localpage> Back To Website {"->"}</Localpage>
          </div>
          <div className=' mt-[100%] gap-4 justify-center items-center  left-[50%] flex flex-col'>
            <p className='text-white text-2xl font-bold'>Creating Projects,</p>
            <p className='text-white text-2xl font-bold'>Creating Meetings</p>
            <ul className='flex flex-row gap-4'>
              <li className='w-12 h-1 bg-[#2731c7]'></li>
              <li className='w-12 h-1 bg-[#2731c7]'></li>
              <li className='w-12 h-1 bg-white'></li>
            </ul>
          </div>
      </div>
      <div className='bg-[#ae87f36e] w-[480px]  p-10 rounded-md h-fit '>
            {children}
      </div>
    {/* </div> */}
    </div>
  )
};

export default AuthLayout;
