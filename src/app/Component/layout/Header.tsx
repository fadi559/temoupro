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
    <header className="w-full sticky top-0 z-50">
    <div className={`w-full transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Annotincamentbar/>
      <div className="w-full flex items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm px-4 sm:px-6">
       
        <div className="flex items-center gap-2 sm:gap-6 mr-auto">
          <button className="text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <nav className="hidden md:flex gap-4 lg:gap-8 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Shop</Link>
            <Link href="/shop" className="text-gray-700 hover:text-gray-900">New Arrivals</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">Sale</Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900">About</Link>
          </nav>
        </div>
  
      
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="#" className="text-black font-bold text-lg">LINK</Link>
        </div>
  
       
        <div className="flex items-center gap-4 sm:gap-6 ml-auto">
          <button className="text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z" />
            </svg>
          </button>
          <Link href="auth/sign-in" className="text-black hover:text-gray-700 hidden sm:block">Sign In</Link>
          <Link href="auth/sign-up" className="text-black hover:text-gray-700 hidden sm:block">Sign Up</Link>
          <button className="text-gray-700 hover:text-gray-900 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0</span>
          </button>
        </div>
      </div>
    </div>
  </header>
  
  )
}


export default Header