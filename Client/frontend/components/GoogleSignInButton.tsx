import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
// import GoogleIcon from '@mui/icons-material/Google';

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
      className='w-full flex flex-row justify-evenly   font-bold'
    >
        {/* <GoogleIcon/> */}
    {/* <img src={GoogleIcon} alt="" /> */}
      {children}
    </Button>
  );
};

export default GoogleSignInButton;