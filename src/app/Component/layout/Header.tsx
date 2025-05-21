'use client';
import { logoutUser } from '@/actions/auth';
import HeaderSearchBar from './HeaderSerachbar';
import { useCartStore } from '@/stores/cart-store';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

const AnnouncementBar = () => {
    return (
        <div className='w-full bg-black py-2'>
            <div className='container mx-auto flex items-center justify-center px-4'>
                <span className='text-center text-sm font-medium tracking-wide text-white'>
                    FREE SHIPPING ON ORDERS OVER $15.00 • FREE RETURNS
                </span>
            </div>
        </div>
    );
};

type HeaderProps = {
    user: Omit<User, 'passwordHash'> | null;
    categorySelector: React.ReactNode;
};

const Header2 = ({ user, categorySelector }: HeaderProps) => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const { open, getTotalItems, setLoaded } = useCartStore(
        (state) => ({
            open: state.open,
            getTotalItems: state.getTotalItems,
            setLoaded: state.setLoaded
        }),
        shallow
    );

    useEffect(() => {
        setLoaded(true);
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isScrollingUp = currentScrollY < lastScrollY;
                    setIsVisible(isScrollingUp || currentScrollY < 10);
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setLoaded]);

    return (
        <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 bg-white shadow-md' : '-translate-y-full bg-transparent'}`}>
            {/* Announcement Bar - Hidden on mobile */}
            <div className='hidden sm:block'>
                <AnnouncementBar />
            </div>

            {/* Main Header */}
            <div className='container mx-auto px-4'>
                {/* Desktop Header */}
                <div className='hidden sm:flex items-center justify-between h-16'>
                    {/* Left Section */}
                    <div className='flex items-center space-x-8'>
                        {categorySelector}
                        <Link href='#' className='text-gray-700 hover:text-gray-900 font-medium'>
                            Sale
                        </Link>
                    </div>

                    {/* Center - Logo */}
                    <Link href='/' className='absolute left-1/2 transform -translate-x-1/2'>
                        <span className='text-2xl font-bold text-black'>DEAL</span>
                    </Link>

                    {/* Right Section */}
                    <div className='flex items-center space-x-6'>
                        <HeaderSearchBar />
                        
                        {user ? (
                            <div className='flex items-center space-x-4'>
                                <span className='text-sm text-gray-700'>{user.email}</span>
                                <button
                                    onClick={async () => {
                                        await logoutUser();
                                        router.refresh();
                                    }}
                                    className='text-sm font-medium text-gray-700 hover:text-gray-900'
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                <Link href='/auth/sign-in' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
                                    Sign In
                                </Link>
                                <Link href='/auth/sign-up' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        <button 
                            onClick={() => open()} 
                            className='relative p-2 text-gray-700 hover:text-gray-900'
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                            </svg>
                            <span className='absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                                {getTotalItems()}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className='sm:hidden flex items-center justify-between h-14'>
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='p-2 text-gray-700'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                        </svg>
                    </button>

                    <Link href='/' className='text-xl font-bold text-black'>
                        DEAL
                    </Link>

                    <button 
                        onClick={() => open()} 
                        className='relative p-2 text-gray-700'
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                        </svg>
                        <span className='absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                            {getTotalItems()}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='sm:hidden fixed inset-0 bg-white z-50 animate-fadeIn'>
                    <div className='container mx-auto px-4 py-6'>
                        <div className='flex justify-center mb-8'>
                            <Link 
                                href='/' 
                                className='text-2xl font-bold text-black hover:opacity-80 transition-opacity'
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setTimeout(() => {
                                        router.push('/');
                                    }, 100);
                                }}
                            >
                                DEAL
                            </Link>
                        </div>

                        <div className='space-y-6 bg-slate-50'>
                            <div className='flex items-center gap-2'>
                                <div className='flex-1 bg-gray-50 rounded-lg p-2'>
                                    <HeaderSearchBar />
                                </div>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className='p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className='border-t border-gray-200 pt-6'>
                                <div className='bg-slate-50'>
                                    {categorySelector}
                                </div>
                            </div>

                            <Link 
                                href='#' 
                                className='block text-gray-700 hover:text-gray-900 font-medium py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors'
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sale
                            </Link>

                            {user ? (
                                <div className='space-y-3 pt-4 border-t border-gray-200'>
                                    <span className='block text-sm text-gray-600 px-4'>{user.email}</span>
                                    <button
                                        onClick={async () => {
                                            await logoutUser();
                                            router.refresh();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className='block w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className='space-y-3 pt-4 border-t border-gray-200'>
                                    <Link 
                                        href='/auth/sign-in' 
                                        className='block text-sm font-medium text-gray-700 hover:text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        href='/auth/sign-up' 
                                        className='block text-sm font-medium text-gray-700 hover:text-gray-900 py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header2;