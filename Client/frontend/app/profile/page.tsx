"use client"
import React, { useEffect, useState } from 'react'
import {User} from '../../../../Server/backend/src/user/user.entity'
import Image from 'next/image';
import Picture from '@/image/background.jpg'

function ProfilePage() {
  const [allUsers, SetAllUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const Users: any  = await fetch(`http://localhost:3001/api/user/sorted`);
        console.log('User -> ', Users);
        if (Users.ok) {
          const validUsers: User[] | [] = await Users.json();
          SetAllUsers(validUsers);
          console.log('validUsers -> ', validUsers)
        }
      } catch(error) {
        console.log('Error fetching all users from database -> : ', error);
      }
    }
    fetchAllUsers();
  }, []);
  return (
    // <div 
    //   className='flex w-full  gap-2 p-2 rounded-sm
    //           bg-green-700 border-[2px] border-black'>
    //     {
    //       allUsers.map((users) => (
    //         <ul 
    //           className='flex flex-col'
    //           key={users.id}>
    //           <Image
    //             alt='image-picture'
    //             width={35}
    //             height={35}
    //             src={users.picture || Picture}
    //             className='rounded-full'
    //           />
    //           <p className='text-black'>{users.username}</p>
    //         </ul>
    //       ))
    //     }
    // </div>
    // <p>{allUsers[0].username}</p>
    <p>hello world</p>
  )
}

export default ProfilePage