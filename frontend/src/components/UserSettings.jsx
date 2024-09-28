import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout, reset } from '../redux/userSlice';
import { FiLogOut } from "react-icons/fi";
import ProfilePicture from '../components/ProfilePicture';
import Loader from './Loader';
import {motion} from 'framer-motion';

function UserSettings() {
    const {user,isLoading,isError,isSuccess,message} = useSelector(state=>state.auth);
    const {dark} = useSelector(state=>state.theme);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ref = useRef(null);

    useEffect(()=>{
        if(isError){
            toast.error(message);
            return;
        }
        if(!user?.token) {
            navigate('/');
            return;
        }
    },[user])


    useEffect(()=>{
        const outsideClickHandler = (event)=>{
            if(ref.current && !ref.current.contains(event.target)){
                navigate('/dashboard');
            }
        }
        document.addEventListener('click',outsideClickHandler,true);
        return ()=>{
            document.removeEventListener('click',outsideClickHandler,true);
        }
    },[])

    const logoutButtonHandler = ()=>{
        dispatch(userLogout());
        dispatch(reset());
        navigate('/');
    }

    if(isLoading){
        return <Loader />
    }

    return (
        <div className={`${dark ? "dark" : ""}`}>
            <div className=' min-w-full min-h-screen flex flex-wrap items-center justify-evenly bg-neutral-200 dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 fixed top-0'>

                <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                transition={{duration:0.15, ease:'easeOut'}}
                className='flex items-center justify-center w-full'
                >
                <div className=" w-4/5 sm:w-2/3 md:w-1/2 l:w-5/12 xl:w-1/3 p-4 my-3 flex flex-col items-center justify-center rounded-lg bg-neutral-300 dark:bg-zinc-900 dark:text-white " ref={ref}>

                    <ProfilePicture size='' />
                    <h1 className='text-2xl mt-4'>Hi {user.name}</h1>
                    <button className='w-1/2 md:w-1/3 p-1.5 mt-5 bg-theme flex justify-center items-center rounded-lg hover:bg-neutral-400 hover:text-black hover:scale-105 transition-all duration-200' onClick={logoutButtonHandler}>
                        Logout<FiLogOut className='ml-2'/>
                    </button>
                </div>
                </motion.div>

            </div>
        </div>
    )
}

export default UserSettings;