'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/shallow';
import { logoutUser } from '@/actions/auth';
import HeaderSearchBar from './HeaderSerachbar';




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
/*i did make defrent i put this ? in the middel categorySelector: React.ReactNode;*/

type HeaderProps = {
  user: Omit<User, 'passwordHash'> | null;
  categorySelector?: React.ReactNode;
};

      const Header2 = ({ user, categorySelector }: HeaderProps) => {
    const [isOpen,setIsOpen] = useState<boolean>(true);
    const  router = useRouter();
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
            <Link href="/shop" className="text-gray-700 hover:text-gray-900">Shop</Link>
            <Link href="/newArrivals" className="text-gray-700 hover:text-gray-900">New Arrivals</Link>
            {categorySelector}
            <Link href="/sale" className="text-gray-700 hover:text-gray-900">Sale</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          </nav>
        </div>
  
      
         <div className="absolute left-1/2 transform -translate-x-1/2 ">
              <Link href="#" className="block">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                  DEAL
                </span>
              </Link>
          </div>
        <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <HeaderSearchBar/>
        
          {user ? (
                <div className='flex items-center gap-2 sm:gap-4'>
                  <span className='text-sm text-gray-700 hidden md:block'>{user.email}</span>
                        <Link
                                    href='#'
                                     className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'
                             onClick={async (e) => {
                                            e.preventDefault();
                                            await logoutUser();
                                            router.refresh();
                                        }}
                                    >
                                        Sign Out
                                    </Link>
                                </div>
                            ) : (
                                <React.Fragment>
                                    <Link href='/auth/sign-In' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                                        Sign In
                                    </Link>
                                    <Link href='/auth/sign-up' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                                        Sign Up
                               </Link>
              </React.Fragment>
              )}

          {/* <Link href="auth/sign-in" className="text-black hover:text-gray-700 hidden sm:block">Sign In</Link>
          <Link href="auth/sign-up" className="text-black hover:text-gray-700 hidden sm:block">Sign Up</Link> */}


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
export default Header2;