import { useRef, useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import CropPage from './CropPage';
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import DefaultDP from '../assets/icons/userLogo.png';

function ProfilePicture({size}) {
    const navigate = useNavigate();
    const {user} = useSelector(state=>state.auth);
    const {dark} = useSelector(state=>state.theme);
    const avatarUrl = useRef(user?.dp || DefaultDP);
    const [cropOpen, setCropOpen] = useState(false);

    const updateAvatar = (imgSrc) => {
        avatarUrl.current = imgSrc;
    };

    // useEffect(()=>{
    //     if(!user){
    //         navigate('/');
    //         return;
    //     }
    // },[])
    
    return (
        <div className={`${dark ? "dark" : ""}`}>
            <div className="flex flex-col items-center w-fit">
                <div className="relative">
                <img
                    src={avatarUrl.current}
                    alt="Avatar"
                    className="rounded-full border-2 border-gray-400"
                    style={{height:size||'200px',width:size||'200px'}}
                />
                <button
                    className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full dark:bg-gray-800  border border-gray-600"
                    title="Change photo"
                    onClick={() => setCropOpen(true)}
                >
                    <FaPencil color={`${dark ? "white" : "black"}`}/>
                </button>
                </div>
                {cropOpen && (
                <CropPage
                    updateAvatar={updateAvatar}
                    closeCropPage={() => setCropOpen(false)}
                />
                )}
            </div>
        </div>
    );
}

export default ProfilePicture;