import React from 'react';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import { MdOutlineDarkMode,MdOutlineLightMode } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';

function ThemeSwitch({size,className}) {
    const {dark} = useSelector(state=>state.theme);
    return (
        dark ? 
        <>
            <MdOutlineLightMode size={size} className={`text-theme hover:bg-neutral-300  p-1.5 rounded-full transition-all duration-200   dark:hover:bg-neutral-300 dark:hover:text-teal-600 ${className}`}/>
        </> : 
        <>
            <MdOutlineDarkMode size={size} className={`text-theme hover:bg-neutral-300  p-1.5 rounded-full transition-all duration-200   dark:hover:bg-neutral-300 dark:hover:text-teal-600 ${className}`}/>
        </>
    )
}

export default ThemeSwitch;