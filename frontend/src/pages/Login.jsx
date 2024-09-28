import React, { useState, useEffect } from 'react'
import MainColorLogo from '../assets/brand-logo/logo-color-main.png';
import {toast} from 'react-toastify';
import ThemeSwitch from '../components/ThemeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/themeSlice';
import { useNavigate } from 'react-router-dom';
import { userLogin,reset } from '../redux/userSlice';
import {motion, AnimatePresence} from 'framer-motion';
import Loader from '../components/Loader';

function Login() {
	const [dataType,setDataType] = useState('username');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {dark} = useSelector(state=>state.theme);

	const {user,isLoading,isError,isSuccess,message} = useSelector(state=>state.auth);

	useEffect(()=>{
		if(isError) toast.error(message);
        if(user?.token) navigate('/dashboard');
        dispatch(reset());
	},[user,isSuccess,isError,message])

	const handleSubmit = (e)=>{
		e.preventDefault();
		const cred = e.target.data.value;
		const password = e.target.password.value;
		if(!cred || !password){
			toast.error("Incomplete details");
			return;
		}
		let data;
		if(dataType=='username'){
			data = {
				username: e.target.data.value,
				password: e.target.password.value,
			}
		}else{
			data = {
				email: e.target.data.value,
				password: e.target.password.value,
			}
		}
		dispatch(userLogin(data));
		// console.log(data);
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
							Login to <img src={MainColorLogo} alt="" className='h-14'/>
						</h1>
						<form onSubmit={handleSubmit} className=' w-full flex flex-wrap items-center justify-evenly'>
							<div className='flex justify-evenly p-3 mt-3 w-full'>
								Login using: 
								<div className='mx-2 sm:mx-0'>
									<input type="radio" id="username" name="loginVia" value="username" className='size-4 mr-1 ' onClick={(e)=>{
										setDataType(String(e.target.value));
									}} />
									<label htmlFor="username">Username</label>
								</div>
								<div>
									<input type="radio" id="email" name="loginVia" value="email" className='size-4 mr-1' onClick={(e)=>{
										setDataType(String(e.target.value));
									}}/>
									<label htmlFor="email">Email</label>
								</div>
							</div>
							<input type="text" name="data" id="data" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder={dataType}/>
							<input type="password" name="password" id="password" className='m-1 p-2 w-full border-2 border-gray-400 rounded-lg dark:bg-black dark:border-gray-600' placeholder='password'/>
							<button type="submit" className='mt-6 p-2 w-1/2 bg-theme rounded-2xl transition-all duration-300 text-white hover:scale-105 hover:bg-neutral-400 hover:text-black'>Login</button>
						</form>
					</div>
				</div>
			</div>
	)
}

export default Login;