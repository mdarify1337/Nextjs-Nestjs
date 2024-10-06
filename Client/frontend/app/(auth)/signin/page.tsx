import SignInForm from '@/components/form/SignInForm';
import '../../style.css'

const page = () => {
  return (
    <div className='fontstyle font-bold  w-full flex flex-col justify-center items-center'>
      <h1 className='font-bold flex flex-row text-4xl'>SignIn</h1>
      <SignInForm />
    </div>
  );
};

export default page;