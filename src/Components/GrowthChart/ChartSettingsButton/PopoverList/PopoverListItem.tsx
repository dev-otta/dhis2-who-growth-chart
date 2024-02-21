import React from 'react';

type PopoverListItemProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export const PopoverListItem = ({ label, icon, onClick }: PopoverListItemProps): JSX.Element => (
  <div 
  className="flex flex-row cursor-pointer hover:bg-gray-100 py-1 px-2 rounded min-w-fit"
  onClick={onClick}>
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
  </div>
);