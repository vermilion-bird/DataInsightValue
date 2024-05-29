import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDataSource, RootState } from '@/redux/store'

type DataSourceCardProps = {
    title: string;
    subTitle: string;
    imgSrc: string;
    imgAlt: string;
    id: string;
    onDelete: () => void; // A callback function for the delete action
};

import { useRouter } from "next/navigation"

export const TableItem: React.FC<DataSourceCardProps> = ({ title, subTitle, imgSrc, imgAlt, id, onDelete }) => {
    const [isHovering, setIsHovering] = useState(false);
    const dispatch = useDispatch()

    const router = useRouter();

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleDeleteClick = () => {
        onDelete(); // Call the onDelete prop when the trash icon is clicked
    };
    const handleItemClick = () => {
        dispatch(setCurrentDataSource({ name: title, id: id }))
        localStorage.setItem('database', JSON.stringify({ name: title, id: id }));

        router.push('/')
    }
    return (
        <div
            className="flex items-center justify-between bg-neutral-100 hover:scale-105 transition duration-300 p-4 rounded-lg cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleItemClick}
        >
            <div>
                <span className="text-lg">{title}</span>
                <div className="text-sm pl-3 overflow-hidden truncate w-64">{subTitle}</div>
            </div>
            <div className="flex items-center justify-between">
                <img className="h-12 w-12 pr-2" src={imgSrc} alt={imgAlt} />
                {isHovering && (
                    <Trash2 className='cursor-pointer' onClick={handleDeleteClick} />
                )}
            </div>
        </div>
    );
};
