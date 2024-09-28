import React from 'react';
import InlineLogoColor from '../assets/brand-logo/logo-color-main.png';
import UserLogo from '../assets/icons/userLogo.png';
import ThemeSwitch from './ThemeSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../redux/userSlice';
import { changeTheme } from '../redux/themeSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Header() {
    const { dark } = useSelector(state => state.theme);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user) {
        return (<></>);
    }

    const handleLogout = () => {
        // Clear user data from local storage or Redux
        userService.logout();
        localStorage.removeItem('token'); // Adjust this if you're using another storage method
        dispatch(reset()); // Reset user state in Redux
        navigate('/'); // Redirect to the login page
        toast.success('Logged out successfully!'); // Optional: notify user
    };

    return (
        <div className={`${dark ? "dark" : ""} z-1`}>
            <div className='fixed top-0 z-10 w-full py-2 pr-4 pl-2 bg-white dark:bg-black'>
                <nav className='flex justify-between items-center'>
                    <img src={InlineLogoColor} alt="" className='h-12' />
                    <div className='flex items-center gap-x-4'>
                        <button onClick={() => dispatch(changeTheme())}>
                            <ThemeSwitch size={35} />
                        </button>
                        {/* Add Logout Button */}
                        <button onClick={handleLogout} className='bg-red-500 rounded-lg p-2 text-white hover:bg-red-600 transition-all duration-150'>
                            Logout
                        </button>
                        <button onClick={() => navigate('/dashboard/settings')}>
                            <img src={user.dp} alt="" className='h-12 rounded-full' />
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
