import React,{useEffect, useState} from 'react'
import MainColorLogo from '../assets/brand-logo/logo-color-main.png';
import ThemeSwitch from '../components/ThemeSwitch';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup, reset } from '../redux/userSlice';
import { changeTheme } from '../redux/themeSlice';
import {useNavigate} from 'react-router-dom';
import Loader from '../components/Loader';

function Register() {

	const {dark} = useSelector(state=>state.theme);
	const {user,isLoading,isError,isSuccess,message} = useSelector(state=>state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(()=>{
		if(isError) toast.error(message);
        if(user?.token) navigate('/profilePicture');
        dispatch(reset());
	},[user,isSuccess,isError,message])


	const handleSubmit = (e)=>{
		e.preventDefault();
		const name = e.target.name.value;
		const username = e.target.username.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const password2 = e.target.password2.value;
		if(!name || !username || !email || !password || !password2){
			toast.error("Incomplete data");
			return;
		}
		if(password!=password2){
			toast.error("Passwords not matching");
			return;
		}
		const data = {name,username,email,password};
		dispatch(userSignup(data));
	}

	if(isLoading){
		return <Loader/>
	}

	return (
		<div className={`${dark?"dark":""}`}>
			<div className="flex justify-center items-center min-h-screen min-w-full px-2 bg-neutral-200 dark:bg-zinc-900 dark:text-white">

				<button onClick={()=>dispatch(changeTheme())}>
					<ThemeSwitch size={35} className={'absolute top-5 right-5'}/>
				</button>

				<div className='p-4 rounded-lg flex flex-col justify-center items-center w-11/12 sm:w-2/3 md:w-7/12 lg:w-4/12 xl:w-3/12'>
					<h1 className=' flex items-center justify-center pb-3 text-3xl text-right'>
						Signup on <img src={MainColorLogo} alt="" className='h-14'/>
					</h1>
					<form onSubmit={handleSubmit} className=' w-full flex flex-wrap items-center justify-evenly'>
						
						<input type="text" name="name" id="name" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder="Name"/>

						<input type="text" name="username" id="username" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder="Username"/>

						<input type="text" name="email" id="email" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder="Email"/>

						<div className='flex'>
							<input type="password" name="password" id="password" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder='Password'/>
							<input type="password" name="password2" id="password2" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder='Confirm password'/>
						</div>
						
						<button type="submit" className='mt-6 p-2 w-1/2 bg-theme rounded-2xl transition-all duration-300 text-white hover:scale-105 hover:bg-neutral-400 hover:text-black'>Register</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register;