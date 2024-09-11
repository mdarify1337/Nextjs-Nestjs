"use client"

import { HandMetal, Link } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import redirect from 'next/navigation';



function Navbar() {
    const Googlelogin = () => {
        window.location.href = 'http://localhost:3000/signin';
    };
    const loginWithGoogle = () => console.log('login with google');
    return (
        <div className='  py-2
                 fixed w-full z-10 top-0'>
            <div className='container  flex items-center flex-row-reverse'>
                {/* <Link href='/'>
                    <HandMetal />
                </Link> */}
                {/* <Link 
                    className={buttonVariants()} 
                    href='http://localhost:3000/signin'>
                    Sign In
                </Link> */}
                {/* <Button className='font-bold ' onClick={Googlelogin}>
                    <p className='p-4'>Sign In </p>
                </Button> */}
            </div>
        </div>
    )
}

export default Navbar