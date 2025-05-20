'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User } from '@prisma/client';
import { logoutUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
    user: Omit<User, 'passwordHash'> | null;
    categorySelector: React.ReactNode;
}

const MobileMenu = ({ user, categorySelector }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <div className='md:hidden'>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className='p-2 text-gray-700 hover:text-gray-900'
            >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
            </button>

            {isOpen && (
                <div className='fixed inset-0 bg-white z-50 pt-16'>
                    <div className='container mx-auto px-4 py-4'>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className='absolute top-9 right-4 p-2'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <nav className='flex flex-col gap-4'>
                            <div className='py-2'>
                                {categorySelector}
                            </div>
                            <Link href='#' className='text-black py-2'>Sale</Link>
                            
                            {user ? (
                                <>
                                    <span className='text-sm text-gray-700 py-2'>{user.email}</span>
                                    <Link
                                        href='#'
                                        className='text-sm font-medium text-gray-700 hover:text-gray-900 py-2'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await logoutUser();
                                            router.refresh();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Sign Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href='/auth/sign-in' 
                                        className='text-sm font-medium text-gray-700 hover:text-gray-900 py-2'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        href='/auth/sign-up' 
                                        className='text-sm font-medium text-gray-700 hover:text-gray-900 py-2'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileMenu; 