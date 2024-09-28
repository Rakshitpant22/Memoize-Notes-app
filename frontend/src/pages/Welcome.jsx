import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/themeSlice';
import SquareLogoColor from '../assets/brand-logo/square-logo-no-background.png';
import ThemeSwitch from '../components/ThemeSwitch';
import { reset } from '../redux/userSlice';
import { resetNotes } from '../redux/noteSlice';
import {motion, AnimatePresence} from 'framer-motion';

function Welcome({key}) {
    const {user,isLoading,isError,isSuccess,message} = useSelector(state=>state.auth);

    useEffect(()=>{
		if(isError) toast.error(message);
        if(!user){
            dispatch(resetNotes());
            return;
        }
        if(user) navigate('/dashboard');
        dispatch(reset());
	},[user,isSuccess,isError,message])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {dark} = useSelector(state=>state.theme);

    return (
            <div className={`${dark ? "dark" : ""}`}>
                <div className="flex justify-center items-center min-h-screen min-w-full px-2 dark:text-white bg-neutral-200 dark:bg-zinc-900">
                    <button onClick={()=>dispatch(changeTheme())}>
                        <ThemeSwitch size={35} className={'absolute top-5 right-5'}/>
                    </button>
                    <div className='rounded-lg flex flex-col justify-center items-center'>
                        <img src={SquareLogoColor} alt="" className='h-64 mb-6'/>
                        <div className='flex  w-4/5 justify-evenly items-center'>
                            <button className='m-1 py-2.5 px-3 bg-theme rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-neutral-400' onClick={()=>navigate('/login')}>Login</button>
                            <button className='m-1 py-2.5 px-3 bg-theme rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-neutral-400' onClick={()=>navigate('/register')}>Signup</button>
                        </div>
                    </div>
                    <div className='absolute bottom-3 text-neutral-700 dark:text-neutral-300'>Made with &hearts; by Harsh Priye</div>
                </div>
            </div>
    )
}

export default Welcome;