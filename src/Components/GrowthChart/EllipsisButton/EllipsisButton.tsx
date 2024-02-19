import React from 'react';

export const EllipsisButton = ({ onClick }: any) => {
    return (
        <>
            <button
                type="button"
                onClick={onClick}
                className="inline-flex items-center justify-center w-7 h-7 rounded border text-gray-600 hover:bg-gray-300 hover:text-gray-700"
            >
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4z" fill="currentColor" fillRule="evenodd" />
                </svg>
            </button>
        </>
    );
};
