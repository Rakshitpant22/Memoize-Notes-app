import React from 'react'
import { useSelector } from 'react-redux';

function Loader() {
    const {dark} = useSelector(state=>state.theme);
    return (
        <div className={`${dark ? "dark" : ""}`}>
            <div className='min-h-screen min-w-full flex justify-center items-center bg-white dark:bg-zinc-900'>
                <div className='loader'></div>
            </div>
        </div>
    )
}

export default Loader;