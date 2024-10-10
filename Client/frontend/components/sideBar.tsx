import React from 'react'
import Image from 'next/image'
import background from '@/image/DALL·E 2024-10-03 15.14.00 - A halftone dot gradient similar to the top left quadrant of a retro halftone pattern. The dots start large and gradually decrease in size as they move 2 1 (1).png'

function SideBar() {
  return (
    <div className='h-full w-[125px] fixed left-0 '>
        <Image
                src={background}
                width={500}
                height={600}
                alt='background'
            />
    </div>
  )
}

export default SideBar