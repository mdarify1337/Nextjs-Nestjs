import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='bg-[#b48bfde6]  border-[1px] border-[#f6ef88] border-solid p-10 rounded-md'>
        {children}
    </div>
  )
};

export default AuthLayout;
