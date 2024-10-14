import SignInForm from '@/components/form/SignInForm';
import '../../style.css'

const page = () => {
  return (
    <div className='fontstyle font-bold h-[100%] w-full flex flex-col 
      p-4 gap-6 mt-12 justify-center font-monospace items-center'>
      <h1 className='font-bold flex flex-row text-4xl'>SignIn</h1>
      <SignInForm />
    </div>
  );
};

export default page;