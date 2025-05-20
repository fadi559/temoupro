'use client';

import React from 'react';

interface CategoryButtonProps {
    children: React.ReactNode;
}

const CategoryButton = ({ children }: CategoryButtonProps) => {
    return (
        <button 
            className='peer group text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1 px-2 py-1'
        >
            {children}
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
                className="transition-transform duration-200 group-hover:rotate-180"
            >
                <path d="m6 9 6 6 6-6"/>
            </svg>
        </button>
    );
};

export default CategoryButton; 