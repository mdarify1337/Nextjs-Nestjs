import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

interface LocalpageProps {
  children: ReactNode;
}
const Localpage: FC<LocalpageProps> = (
      { children }) => {
  const localpage = () => {
    console.log('login with google');
    window.location.href = 
        'http://localhost:3000';
  }
  return (
    <Button 
      onClick={localpage} 
      className='text-white font-bold w-[160px]  flex justify-center items-center absolute right-0 mr-3 mt-3 bg-[#111330] p-1 rounded-[25px]'
    >
      {children}
    </Button>
  );
};

export default Localpage;