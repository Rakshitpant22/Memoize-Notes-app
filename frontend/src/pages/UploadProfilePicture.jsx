import React, { useEffect } from 'react'
import ProfilePicture from '../components/ProfilePicture';
import { useSelector, useDispatch } from 'react-redux';
import {changeTheme} from '../redux/themeSlice';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from '../components/ThemeSwitch';
import Loader from '../components/Loader';

function UploadProfilePicture() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {dark} = useSelector(state=>state.theme);
    const {user,isLoading} = useSelector(state=>state.auth);

    useEffect(()=>{
        if(!user || !user?.token){
            navigate('/');
            return;
        }
    },[user]);

    if(isLoading){
        return <Loader />
    }

    return (
        <div className={`${dark?"dark":""}`}>
			<div className="flex justify-center items-center min-h-screen min-w-full px-2 bg-neutral-200 dark:bg-zinc-900 dark:text-white">

				<button onClick={()=>dispatch(changeTheme())}>
					<ThemeSwitch size={35} className={'absolute top-5 right-5'}/>
				</button>

				<div className='p-4 rounded-lg flex flex-col justify-center items-center w-11/12 sm:w-2/3 md:w-7/12 lg:w-4/12 xl:w-3/12'>
					<div className=' flex justify-center items-center pb-3 text-right gap-x-10'>
                        <h1 className='text-3xl'>Upload a profile picture</h1>
						<button className=' p-2 w-1/2 bg-theme rounded-2xl transition-all duration-300 text-white hover:scale-105 hover:bg-neutral-400 hover:text-black' onClick={()=>navigate('/dashboard')}>Or maybe later</button>
					</div>
                    <ProfilePicture size='200px'/>
                    <button className='mt-6 p-2 w-1/2 bg-theme rounded-2xl transition-all duration-300 text-white hover:scale-105 hover:bg-neutral-400 hover:text-black' onClick={()=>navigate('/dashboard')}>Done!</button>
				</div>
			</div>
		</div>
    )
}

export default UploadProfilePicture