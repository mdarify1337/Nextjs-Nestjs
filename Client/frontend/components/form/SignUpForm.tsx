'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { redirect } from 'next/navigation';
// import { Email } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';
const FormSchema = z
  .object({
    username: 
      z.string()
       .min(1, 'Username is required')
       .max(100),
    email: 
       z.string()
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: 
       z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
    confirmPassword: 
       z.string()
        .min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  // const routter = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log('values ', values)
    try {
      const response = await fetch(`http://localhost:3001/api/user/email/${values.email}`);
      console.log('Response -> ', response);
      const responseText = await response.text();
      console.log('Response Text -> ', responseText);
      const validUser = responseText ? JSON.parse(responseText) : null;
      if (response.ok && validUser) {
        console.log('validUser -> ', validUser);
        if (validUser && validUser.email === values.email) {
          console.log('User already exists. Redirecting to sign-in page...');
          window.location.href = 'http://localhost:3000/signin';
          return;
        }
      } else if (response.ok && !validUser) {
        console.log('error2 ->');
        const createResponse = await fetch(`http://localhost:3001/api/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        console.log('createResponse -> ', createResponse);
        const createResponseText = await createResponse.text();
        console.log('Create Response Text -> ', createResponseText);
        if (createResponse.ok) {
          console.log('User created successfully. Redirecting to sign-in page...');
          window.location.href = 'http://localhost:3000/signin';
        } else {
          throw new Error('Failed to create user. Please try again.');
        }
      }
    } catch (error) {
      console.log(error);
      // alert('A Response Error occurred. Please try again.'); 
    }
    
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white font-bold'>Username</FormLabel>
                <FormControl>
                  <Input 
                  className='placeholder:text-black text-black' 
                  placeholder='username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white  font-bold'>Email</FormLabel>
                <FormControl>
                  <Input 
                  className='placeholder:text-black text-black'
                  placeholder='username@gmail.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white font-bold'>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    className='placeholder:text-black text-black'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel 
                
                className='text-white font-bold'>Re-enter your password</FormLabel>
                <FormControl>
                  <Input
                  className='placeholder:text-black text-black'
                    placeholder='Re-Enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6 font-bold' type='submit'>
          Sign up
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      <p className='text-center text-sm text-black mt-2 font-bold'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-800 font-bold hover:underline' href='/signin'>
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;