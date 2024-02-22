import React from 'react';

type PopoverListItemProps = {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
};

export const PopoverListItem = ({ label, icon, onClick }: PopoverListItemProps): JSX.Element => (
    <div
        role='button'
        tabIndex={0}
        className='flex flex-row cursor-pointer hover:bg-gray-300 py-1 px-2 rounded min-w-fit'
        onClick={onClick}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                onClick();
            }
        }}
    >
        <span className='icon'>{icon}</span>
        <span className='label'>{label}</span>
    </div>

);
