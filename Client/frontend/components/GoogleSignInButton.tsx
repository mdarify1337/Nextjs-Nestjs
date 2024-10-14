import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import google from '@/image/google.png'
import github from '@/image/github.png'
import Image from 'next/image';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = (
      { children }) => {
  const loginWithGoogle = () => {
    console.log('login with google');
    window.location.href = 
        'http://localhost:3001/api/auth/google/callback';
  }
  return (
    <Button 
      onClick={loginWithGoogle} 
      className='w-full flex flex-row justify-evenly   font-bold bg-[#252A39] p-4'
    >
      <Image
        src={google}
        width={25}
        height={25}
        alt='background'
      />
      {children}
    </Button>
  );
};

export default GoogleSignInButton;