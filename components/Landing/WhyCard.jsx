import React from 'react'
import Cont from '../../assets/images/Container.png'
import Image from 'next/image'

export default function WhyCard({title, subtitle, copy1, copy2}) {
  return (
    <div className=' bg-[#e6f3ec] rounded-xl'>
      <div className='p-[38px]'>
        <div className='font-semibold text-xl'>{title}</div>
        <div className='text-sm'>{subtitle}</div>
      </div>
      <div className='pl-8'>
        <Image src={Cont} alt='Container' />
      </div>
    </div>
  )
}
