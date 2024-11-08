import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import github from '@/image/github.png'
import Image from 'next/image';
// import GoogleIcon from '@mui/icons-material/Google';

interface GitHubSigninButtonProps {
  children: ReactNode;
}
const GitHubSignin: FC<GitHubSigninButtonProps> = (
      { children }) => {
  const loginWithGithub = () => {
    console.log('login with github');
    window.location.href = 'http://localhost:3001/api/github/login';
  }
  return (
    <Button 
      onClick={loginWithGithub} 
      className='w-full flex flex-row justify-evenly   font-bold bg-[#000000] p-4'
    >
      <Image
        src={github}
        width={30}
        height={30}
        alt='background'
         className='bg-white rounded-full border-[1.5px] border-white'
      />
      {children}
    </Button>
  );
};

export default GitHubSignin;