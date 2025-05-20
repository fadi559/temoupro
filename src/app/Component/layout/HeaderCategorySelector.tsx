'use client';

import { getAllCategories } from '@/sanity/lib/client';
import Link from 'next/link';
import React, { useState } from 'react';

interface Category {
    _id: string;
    title?: string;
    slug?: {
        current?: string;
    };
}

const HeaderCategorySelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            const cats = await getAllCategories();
            setCategories(cats);
        };
        fetchCategories();
    }, []);

    const handleHomeClick = () => {
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div className='relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors'
            >
                Categories
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className='absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-[100] animate-fadeIn'>
                    <div className='py-2 max-h-[60vh] overflow-y-auto bg-white rounded-xl'>
                        <Link
                            href='/'
                            className='block px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 bg-white transition-colors border-b border-gray-100'
                            onClick={handleHomeClick}
                        >
                            <div className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                                Home
                            </div>
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                href={`/category/${category.slug?.current}`}
                                className='block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white transition-colors'
                                onClick={() => setIsOpen(false)}
                            >
                                {category.title ?? 'No Title'}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderCategorySelector;