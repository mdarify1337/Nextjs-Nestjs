import Navbar from '@/components/NavBar';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import background from '@/image/DALL·E 2024-10-03 15.14.00 - A halftone dot gradient similar to the top left quadrant of a retro halftone pattern. The dots start large and gradually decrease in size as they move 2 1 (1).png'

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-row gap-24 justify-center items-center border-white border-[1px] w-full'>
      {/* <Image
        src={background}
        width={125}
        height={1920}
        alt='background'
      /> */}
      <Navbar/>
      <div className='bg-[#ae87f36e]  p-10 rounded-md h-fit mr-4'>
            {children}
      </div>
    </div>
  )
};

export default AuthLayout;
