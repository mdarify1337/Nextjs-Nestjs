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

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="flex flex-row justify-around items-start absolute top-4 left-3">
          <div>
            <span className="border-white border-[2px] rounded-full w-[45px] h-[25px] p-1 text-extrabold ">Pr</span>
          </div>
      </header>
    </div>
  );
}
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

// export default function BackgroundBeamsWithCollisionDemo() {
//   return (
//       <BackgroundBeamsWithCollision className="flex flex-col gap-8 ">
        
//         <h2 className="text-2xl relative z-20 md:text-3xl lg:text-5xl font-bold text-center text-white dark:text-white font-sans tracking-tight">
//           What&apos;s the best webapplication to Manage your project?{" "}
//           <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
//             <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
//               <span className="">Project Pro.</span>
//             </div>
//             <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
//               <span className="">Project Pro.</span>
//             </div>
//           </div>
//         </h2>
//       </BackgroundBeamsWithCollision>
//   );
// }
