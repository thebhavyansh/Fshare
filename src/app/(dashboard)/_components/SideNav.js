"use client"
import { File, Shield, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'  

function SideNav() {
    const [activeindex,setActiveindex] = useState(0)
    const menuList = [
        {
            id:1,
            name:'Upload',
            icon:Upload,
            path:'/upload'
        },
        {
            id:2,
            name:'Download',
            icon:File,
            path:'/download'
        },
        {
            id:3,
            name:'upgrade',
            icon:Shield,
            path:'/upgrade'
        }
    ]
  return (
    <div className='shadow-sm border-r h-full'>
        <div className='p-5 border-b'>
            <Image src='/logo.svg' width={60} height={40} alt='ntg' />
        </div>
        <div className='flex flex-col float-left w-full'>{menuList.map((item,index)=>(
            <Link href={item.path} key={item.id}> <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-gray-500 `} 
                onClick={()=>setActiveindex(index)}
                
                >
                    <item.icon/>
                    <h2 >{item.name}</h2>
                </button>
            </Link>   
            ))}
            </div>  
    </div>
  )
}

export default SideNav