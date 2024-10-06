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
import GoogleSignInButton from '../GoogleSignInButton'

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

function SignInForm () {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit =  async (values: z.infer<typeof FormSchema>) => {
    console.log('data of signin user' ,values);
    
    try {
      const response = await fetch(`http://localhost:3001/api/user/email/${values.email}`);
      console.log('Response -> ', response);
      const responseText = await response.text();
      console.log('Response Text -> ', responseText);
      const validUser = responseText ? JSON.parse(responseText) : null;
      if (response.ok) {
        console.log('validUser -> ', validUser);
          const createResponse = await fetch(`http://localhost:3001/api/user/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          console.log('createResponse -> ', createResponse);
          const createResponseText = await createResponse.text();
          console.log('Create Response Text -> ', createResponseText);
          if (createResponse.ok ) {
            console.log('User created successfully. Redirecting to sign-in page...');
            window.location.href = 'http://localhost:3000/profile';
          } 
           else if (createResponse.status === 401) {
            const errorResponse = await createResponse.json();
            console.log(errorResponse);
            // throw new Error('Unauthorized: Invalid password');
          }
          else {
            console.log('Failed to create user. Please try again.');
          }
          return;

      } else if (response.ok && !validUser) {
          console.log('invalid data, pleast enter a valid data')
      } 
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel
                className='font-bold text-white'
                >Email</FormLabel>
                <FormControl>
                  <Input 
                  className='placeholder:text-black font-bold text-black '
                  placeholder='mail@example.com' {...field} />
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
                <FormLabel
                 className='font-bold text-white'
                 >Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    className='placeholder:text-black font-bold  text-black'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6 font-bold' type='submit'>
          Sign in
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className='text-center text-sm text-black mt-2 font-bold'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-800 font-bold hover:underline' href='/signup'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;