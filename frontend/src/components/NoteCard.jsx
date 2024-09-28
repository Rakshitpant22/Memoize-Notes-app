import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

function NoteCard({note}) {

    const {dark} = useSelector(state=>state.theme);
    const navigate = useNavigate();

    return (
        
        <div className={`${dark ? "dark" : ""} cursor-pointer`} onClick={(e)=>navigate(`/dashboard/${note._id}`)}>
            <div className={`p-4 my-3 w-full inline-flex flex-col overflow-hidden rounded-lg brightness-110 dark:brightness-80 dark:text-white ${note.color=='none' ? "border-2 border-zinc-600 dark:border-zinc-300" : ""} hover:scale-105 transition-all duration-200`} style={{backgroundColor:note.color}}>
                <div className='text-2xl mb-6'>{note.title}</div>
                <div className=''>{note.text}</div>
            </div>
        </div>
    )
}

export default NoteCard;