import React, { useEffect } from 'react';
import InlineLogoColor from '../assets/brand-logo/logo-color-main.png';
import UserLogo from '../assets/icons/userLogo.png';
import ThemeSwitch from './ThemeSwitch';
import {useSelector,useDispatch} from 'react-redux';
import { reset } from '../redux/userSlice';
import { changeTheme } from '../redux/themeSlice';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

function Header() {

	const {dark} = useSelector(state=>state.theme);
	const {user,isError,isLoading,isSussess,message} = useSelector(state=>state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	if(!user){
		return (<></>)
	}

	return (
		<div className={`${dark?"dark":""} z-1`}>
			<div className='fixed top-0 z-10 w-full py-2 pr-4 pl-2 bg-white dark:bg-black'>
				<nav className='flex justify-between items-center'>
					<img src={InlineLogoColor} alt="" className='h-12'/>
					{/* <input type="text" placeholder="Search notes" className='rounded-lg p-2 border-2 border-gray-300 dark:border-gray-400 dark:bg-gray-800'/> */}
					<div className='flex items-center gap-x-4'>
						<button onClick={()=>dispatch(changeTheme())}>
							<ThemeSwitch size={35}/>
						</button>
						<button onClick={()=>navigate('/dashboard/settings')}>
							<img src={user.dp} alt="" className='h-12 rounded-full' />
						</button>
					</div>
				</nav>
			</div>
		</div>
	)
}

export default Header