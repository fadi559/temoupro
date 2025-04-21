'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'




const Annotincamentbar =()=>{
    return(

    <div className='w-full bg-black py-2'>
       <div className='container mx-auto flex items-center justify-center px-8'>
        <span className='text-center text-sm font-medium tracking-wide text-white'>
        FREE SHIPPING ON ORDERS OVER $15.00 • FREE RETURNS
        </span>
       </div>
    </div>
    )

}



const Header = () => {
    const [isOpen,setIsOpen] = useState<boolean>(true);

    const [prevScrollY, setPrevScrollY] = useState<number>(0);

useEffect(()=>{
    const handelScroll=()=>{
        const currentScrollY = window.scrollY;
        const scrolledUp = currentScrollY < prevScrollY;

        if  (scrolledUp){
            setIsOpen(true);
        }else if (currentScrollY > 100){
            setIsOpen(false);
        }
        setPrevScrollY(currentScrollY);

    }
    setPrevScrollY(window.scrollY);
   

   window.addEventListener('scroll',handelScroll);
   return () => {
        window.removeEventListener('scroll',handelScroll);
    }

},[prevScrollY])


  return (
    <header className='w-full sticky top-0 z-50'>
        <div  className={`w-full transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
            <Annotincamentbar/>
            <div className='w-full flex justify-between items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm'>
            <div className='flex justify-between items-center container mr-auto px-8'>
                <div className='flex flex-1 justify-start items-center gap-4 sm:gap-6'>
                    <button className='text-gray-700 hover: text-gray-900 '>
                      
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                           <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                                </svg>
                          </button>
                          <nav  className= ' flex gap-4 1g:gap-6 text-sm font-medium'>
                            <Link href='/' className='text-gray-700 hover:text-gray-900'>Shop</Link>
                            <Link href='/shop' className='text-gray-700 hover:text-gray-900'>New Arrvails</Link>
                            <Link href='/about' className='text-gray-700 hover:text-gray-900'>Sale</Link>
                            <Link href='/blog' className='text-gray-700 hover:text-gray-900'>About</Link>
                           
                           
                          </nav>
                
                </div>

               <Link href={'#'} className='text-black'>link  </Link>

              

                <div className='flex flex1 justify-end items-center gap-2 sm:gap-4 left-5'>
                   
                    <button className='text-gray-700 hover:text-gray-900' >
                        
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z" />

                         </svg>
                    </button>
                    <Link href ='auth/sign-in' className='text-black'>sign-in </Link>
                    <Link href='auth/sign-up' className='text-black'>sign-up </Link>
                    
                    <button className='text-gray-700 hover:text-gray-900'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                                <span>

                                </span>
                    </button>

                </div>
              </div>   
            </div>
        </div>
    </header>
  )
}


export default Header