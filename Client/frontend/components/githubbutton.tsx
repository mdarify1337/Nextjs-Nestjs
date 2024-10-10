import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
// import GoogleIcon from '@mui/icons-material/Google';

interface GitHubSigninButtonProps {
  children: ReactNode;
}
const GitHubSignin: FC<GitHubSigninButtonProps> = (
      { children }) => {
  const loginWithGoogle = () => {
    console.log('login with github');
    window.location.href = 
        'http://localhost:3001/api/github/login';
  }
  return (
    <Button 
      onClick={loginWithGoogle} 
      className='w-full flex flex-row justify-evenly   font-bold bg-[#252A39] p-4'
    >
      {children}
    </Button>
  );
};

export default GitHubSignin;