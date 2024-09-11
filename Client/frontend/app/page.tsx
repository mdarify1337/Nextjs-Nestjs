"use client";
import { useEffect, useState } from "react";
import { User } from '../../../Server/backend/src/user/modal/user.modal';
import { getQueryParams } from "@/utils/getQueryParams";
import './style.css';
import logo from '../image/newlogo.png';
import Image from 'next/image';
import { UserService } from "@/service/user.service";


export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [userId , setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const queryParams = getQueryParams(window.location.search);
  //   const accessToken = queryParams.accessToken;
  //   console.log('accesstoken ',accessToken , ' end')
  //   if (accessToken) {
  //     fetchUserData(accessToken)
  //     console.log('userId.length === ', userId.length)
  //     if (userId.length != 0)
  //       fetchUserDataById(userId, accessToken);
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);
  // const fetchUserData = async (token: string) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/user/${token}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user data');
  //     }

  //     const data: any = await response.json();
  //     console.log('data ',data);
  //     setUserId(data.user.id);
  //     console.log('first Fetched User:', data.user.id);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const fetchUserDataById = async (id: string, accessToken: string) => {
  //   try {
  //     console.log('id - frontend:',id)

  //     const response = await fetch(`http://localhost:3001/api/user/id/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user data by ID');
  //     }
  //     console.log('response', response)
  //     const data: User = await response.json();
  //     console.log('UserObject2 :',data)
  //     setUser(data);
  //     console.log('Fetched User by ID2: -->', data);
      
  //   } catch (error) {
  //     console.error('Error fetching user data by ID2:', error);
  //   }
  // };
  // useEffect(() => {
  //   console.log('User state updated:2', user);
  // }, [user]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  useEffect(() => {

      const fetchData = async () => {
        const queryParams = getQueryParams(window.location.search);
        const accessToken = queryParams.accessToken;
        try { 
            const userservice: UserService = new UserService();
            const payload = await userservice.getPayload(accessToken);
            console.log('payload == ',payload)
            setUserId(payload.user.id);
            console.log('userId === ',payload.user.id);
            const UserObject = await userservice.getUserById(userId, accessToken);
            setUser(UserObject);
            console.log(UserObject)
        } catch (error) {
          console.log('Error fetching ', error)
        }
      }
      fetchData();
  }, [])
  if (!userId || !user)
    return <p>loading......</p>
  return (
    <div className='  border-[6px] flex flex-row border-black
       bg-white text-base w-[100%] h-[100%] top-1  text-white'>
      <div className="flex flex-row font-bold gap-8 justify-around bg-green-500 w-[100%] h-[45px]">
          <p className="flex mt-1 font-bold size-[8px] left-4">ProjectPro</p>
          {/* <ul className="flex flex-row gap-2 justify-between" >
            <li>Products</li>
            <li>Company</li>
            <li>Ressoures</li>
            <li>Solutions</li>
          </ul> */}
          <div className="flex flex-row gap-4 font-bold size-[8px]">
              <button className="flex justify-center mt-1">login</button>
              <button className="w-[fit-content] h-[30px] justify-center items-center flex rounded-md top-2 text-black p-2 bg-white font-medium">Started</button>
          </div>
      </div>
      {/* <Image
        src={logo}
        alt="Logo"
        className="w-[80px] h-[80px] object-contain"
      /> */}
          {/* <p className="h-[8px] w-[8px]">
            Welcome, {user.user.username}!</p> */}
       {/* {user && (
        <div 
        className="flex flex-row bg-yellow-300"
        >
        
          {user.user.picture && (
            <Image
              src={user.user.picture}
              alt="user picture"
              className="rounded-full w-[25px] h-[25px] "
              width={0}
              height={0}
            />
          )}
        </div>
      )} */}

    </div>
  );
}
