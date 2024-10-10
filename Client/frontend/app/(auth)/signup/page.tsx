import SignUpForm from '@/components/form/SignUpForm';

import '../../style.css'
import { div } from 'framer-motion/client';

const page = () => {
  return (
    <div className='fontstyle w-full flex flex-col justify-center items-center gap-6 font-monospace'>
      <h1 className='font-bold flex flex-row text-4xl'>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

export default page;