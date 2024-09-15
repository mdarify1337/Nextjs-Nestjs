"use client";
import { useEffect, useState } from "react";
import { User } from '../../../Server/backend/src/user/modal/user.modal';
import { getQueryParams } from "@/utils/getQueryParams";
import './style.css';
import vediologo from '../image/re-recording-32.png';
import audiologo from '../image/audio-32.png';
import Image from 'next/image';
import { UserService } from '../service/user.service'
// import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AppProps } from 'next/app'

console.log('Cookies -> {' , Cookies, ' }');
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = getQueryParams(window.location.search);
      const token = Cookies.get('access_token');
      if (token) {
          setAccessToken(token);
      }
      console.log('accesstoken -> ', token);
      try { 
          const userservice: UserService = new UserService();
          const payload:any = await userservice.getPayload(token || '');
          console.log('payload == ',payload)
          setUserId(payload.user.id);
          console.log('userId === ',payload.user.id);
          const UserObject:any = await userservice.getUserById(payload.user.id, token || '');
          console.log('USEROBJECT -> ',UserObject);
          setUser(UserObject);
      } catch (error) {
        console.log('Error fetching ', error)
      }
    }
    fetchData();
}, [])

if (!user)
  return <p>loading......</p>
  //   useEffect(() => {
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
  //     const response = await fetch(`http://localhost:3001/api/user/accessToken/${token}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       credentials: 'include',
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
  //   fetchUserData;
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
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  const str: string = "{-_-}"
  return (
    <div className='   flex flex-col items-center
       text-base w-[100%] h-[100%] top-1  text-white '>
      <div className="flex flex-row bg-[#0f0027e8] m-1  p-4 font-bold gap-8 
          justify-around items-center fixed w-[95.5%] 
            rounded-md h-[75px] border-b-[.5px] border-white">
        <p className="flex mt-2 font-extrabold  absolute left-6 flex-row">
          {str}  ProjectPro
        </p>
        <button 
          className="absolute right-32  w-[85px] 
                    mt-0 justify-center items-center flex rounded-md 
                  bg-[#604fcd] hover:bg-[#3525a0] p-2 text-black   
                    font-bold">
          Sign Up
        </button>
        <button 
          className=" absolute right-6 w-[85px] mt-0 justify-center 
            items-center flex rounded-md  text-black bg-white  p-2 font-bold">
          Login
        </button>
      </div>
      <div 
          className="flex flex-col justify-center items-center m-1 mt-24  
            bg-[#0000008a] w-[95.5%] rounded-md h-auto p-4 text-white font-bold ">
        <h1 className="mt-12 header-style text-white">
          Become Relly good at Project Management with <br></br>
           <span className="flex flex-col justify-center items-center">Project Pro</span>
        </h1>
        <div className="mt-6  text-white flex flex-col gap-1 p-2 font-bold justify-center items-center">
          <p>Manage Your Project fluency with really good options for <br/></p>
          <p>imporve your collaboration, and drive your businnes to Success.</p>
          <div className="flex  mt-4 gap-2 flex-col sm:flex-row">
            <button className="p-2 bg-[#7b2ce3e3] rounded-sm flex flex-row gap-1
              justify-center items-center text-black font-bold">
              <Image src={vediologo} alt="logo" width={30} height={30} />
              Online meeting
            </button>
            <button className="p-2 bg-[#0000005e] rounded-sm">
              <Image src={audiologo} alt="logo" width={30} height={30} />
              Person meeting</button>
            <button className="p-2 bg-[#0000005e] rounded-sm">Upload meeting</button>
          </div>
          <div>

          </div>
        </div>
      </div>
        {/* {user && (
          <>
            <p>{user.username}</p>
            <Image 
              src={user.picture}
              alt="userImage"
              width={75}
              height={75}
              className="rounded-full"
            />
          </>
        )} */}

    </div>
  );
}
