"use client";
import { useEffect, useState } from "react";
import { User } from '../../../Server/backend/src/user/modal/user.modal';
import { getQueryParams } from "@/utils/getQueryParams";
import './style.css';
import vediologo from '@/image/re-recording-32.png';
import audiologo from '../image/audio-25-32.png';
import Image from 'next/image';
import { UserService } from '../service/user.service'
// import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { AppProps } from 'next/app'
import uploadlogo from '@/image/iconography_anatomy2.svg'
import company1 from '@/image/ZxyXaHgQYutIlWQtGVZ51VrkTMtJmbyKomzA3SJVTEA.webp'
// import company2 from '@/image/company-logo-design-new-look-logo-preasentation-office-wall_1274623-1374.jpg'
import company3 from '@/image/dk-company_143-619x295.png'
import company4 from '@/image/topbillder1537x550px_AO24.jpg'

const CompanyArray = [
  company1,
  company3,
  company4
]

console.log('Cookies -> {' , Cookies, ' }');
// export default function Home() {
//   const [user, setUser] = useState<User | null>(null);
//   const [userId, setUserId] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       const queryParams = getQueryParams(window.location.search);
//       const token = Cookies.get('access_token');
//       if (token) {
//           setAccessToken(token);
//       }
//       console.log('accesstoken -> ', token);
//       try { 
//           const userservice: UserService = new UserService();
//           const payload:any = await userservice.getPayload(token || '');
//           console.log('payload == ',payload)
//           setUserId(payload.user.id);
//           console.log('userId === ',payload.user.id);
//           const UserObject:any = await userservice.getUserById(payload.user.id, token || '');
//           console.log('USEROBJECT -> ',UserObject);
//           setUser(UserObject);
//       } catch (error) {
//         console.log('Error fetching ', error)
//       }
//     }
//       fetchData();
//   }, [userId]);
//   if (!user)
//     return <p>loading......</p>
//   const str: string = "{-_-}"
//   return (
//     <div className='flex flex-col items-center
//        text-base w-[100%] h-[100%] top-1  text-white '>
//       <div className="flex flex-row bg-[#0f0027e8] m-1  p-4 font-bold gap-8 
//           justify-around items-center fixed w-[95.5%] 
//             rounded-md h-[75px] border-b-[.5px] border-white">
//         <p className="flex mt-2 font-extrabold  absolute left-6 flex-row">
//           {str}  ProjectPro
//         </p>
//         <button 
//           className="absolute right-32  w-[85px] 
//                     mt-0 justify-center items-center flex rounded-md 
//                   bg-[#604fcd] hover:bg-[#3525a0] p-2 text-black   
//                     font-bold">
//           Sign Up
//         </button>
//         <button 
//           className=" absolute right-6 w-[85px] mt-0 justify-center 
//             items-center flex rounded-md  text-black bg-white  p-2 font-bold">
//           Login
//         </button>
//       </div>
//       <div 
//           className="flex flex-col justify-center items-center m-1 mt-24  
//             bg-[#0000008a] w-[95.5%] rounded-md h-[75%] aboslute p-4 text-white font-bold ">
//         <h1 className="mt-12 header-style text-white">
//           Become Relly good at Project Management with <br></br>
//            <span className="flex flex-col justify-center items-center">Project Pro</span>
//         </h1>
//         <div className="mt-6  text-white flex flex-col gap-1 
//           p-2 font-bold justify-center items-center">
//           <p className="font-bold">Manage Your Project fluency with really good options for <br/></p>
//           <p className="font-bold">imporve your collaboration, and drive your businnes to Success.</p>
//           <div className="flex  mt-4 gap-2 flex-col sm:flex-row">
//             <button className="bg-[#7b2ce3e3] rounded-sm flex flex-row gap-1
//               justify-center items-center text-black font-bold h-8 p-4">
//               <Image src={vediologo} alt="logo" width={20} height={20} />
//               Online meeting
//             </button>
//             <button className="bg-[#ffffffc4] rounded-sm flex flex-row gap-1
//               justify-center items-center text-black font-bold h-8 p-4">
//               <Image src={audiologo} alt="logo" width={15} height={15} />
//               Person meeting</button>
//             <button className="bg-[#ffffffc4] rounded-sm flex flex-row 
//               justify-center items-center text-black font-bold h-8 p-4">
//               <Image src={uploadlogo} alt="logo" width={35}  height={35}/>
//               Upload meeting
//             </button>
//           </div>
//           <div>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col justify-center items-center mt-4 font-bold text-black">
//         <p>Trusted by Thousands Companies and Milliions of Users around the World.</p>
//         <div className="flex flex-row gap-6 rounded-md mt-2">
//           {
//             CompanyArray.map((company, id) => (
//               <Image 
//                 className="rounded-md"
//                 key={id}
//                 src={CompanyArray[id]} 
//                 width={125} height={125}
//                 alt="CompanyArray"
//               /> 
//             ))
//           }
//         </div>
//       </div>
//         {/* {user && (
//           <>
//             <p>{user.username}</p>
//             <Image 
//               src={user.picture}
//               alt="userImage"
//               width={75}
//               height={75}
//               className="rounded-full"
//             />
//           </>
//         )} */}

//     </div>
//   );
// }
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-white dark:text-white font-sans tracking-tight">
        What&apos;s the best webapplication to Manage your project?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Project Pro.</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Project Pro.</span>
          </div>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
