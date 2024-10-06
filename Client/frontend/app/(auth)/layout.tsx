import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='bg-[#ae87f39e]   p-10 rounded-md'>
        {children}
    </div>
  )
};

export default AuthLayout;
