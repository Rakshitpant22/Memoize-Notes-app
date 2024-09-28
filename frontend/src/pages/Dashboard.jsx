import React, { useState, useEffect, useRef } from 'react'
import NoteCard from '../components/NoteCard';
import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { resetNotes, getNotes, createNote } from '../redux/noteSlice';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { IoLogoOctocat } from "react-icons/io5";
import Loader from '../components/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import {toast} from 'react-toastify';

function Dashboard() {

	const {dark} = useSelector(state=>state.theme);
    const {user,userLoading,isError,isSuccess,message} = useSelector(state=>state.auth);
    const {notes,isLoading} = useSelector(state=>state.notes);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const ref = useRef(null);

    const [takingInput,setTakingInput] = useState(false);

    const colorList = [null,'#FF9D76','#FB3569','#AC87C5','#2D9596','#789461','#B47B84','#C69774']
    const [noteColor,setNoteColor] = useState(null)

    useEffect(()=>{
        if(isError){
            toast.error(message);
            return;
        }
        if(!user || !user?.token) {
            navigate('/');
            return;
        }
        dispatch(getNotes());
    },[user])

    useEffect(()=>{
        const outsideClickHandler = (event)=>{
            if(ref.current && !ref.current.contains(event.target)){
                setTakingInput(false);
                setNoteColor(null);
                // setNoteColor('none');
            }
        }
        document.addEventListener('click',outsideClickHandler,true);
        return ()=>{
            document.removeEventListener('click',outsideClickHandler,true);
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            title: e.target.title.value,
            text: e.target.text.value,
            color: noteColor
        }
        // console.log(data);
        setNoteColor(null);
        dispatch(createNote(data));
        e.target.reset();
    }

    // const submit = async (e)=>{
    //     e.preventDefault();
    //     // console.log(e.target.image.files[0]);
    //     const formData = new FormData();
    //     formData.append('image',e.target.image.files[0]);
    //     // console.log(formData);
    //     await axios.post("/api/users/uploadDP",formData)
    // }
    // if(isLoading) {
    //     return <Loader />
    // }
    if(userLoading){
        return <Loader/>
    }
    return (
        <>
            
            <div className={`${dark?"dark":""}`}>
                <Header />
                <div className="p-5 sm:p-8 dark:bg-zinc-900 min-h-screen">


                    <div className='mt-16 mb-3 mx-auto p-2 w-10/12 sm:w-1/2 lg:1/3 border-2 border-theme  flex dark:bg-black justify-center rounded-xl text-black dark:text-white cursor-pointer brightness-110 dark:brightness-80 hover:scale-102 transition-all duration-200' ref={ref} style={{backgroundColor:noteColor}}>

                            <form onSubmit={handleSubmit} className='w-full flex flex-col items-start'>
                                <textarea rows='2' type="text" name="title" id="title" placeholder='Title' className={`bg-transparent focus:outline-none dark:placeholder:text-white p-2 text-2xl w-full ${!takingInput ? "hidden" : ""}`}/>

                                <textarea type="text" name="text" id="text" placeholder='Create new note . . .' 
                                rows={`${!takingInput ? '1' : '5'}`} className={`bg-transparent focus:outline-none dark:placeholder:text-white w-full ${!takingInput ? "cursor-pointer p-1":"p-2"}`} readOnly={!takingInput} onClick={()=>setTakingInput(true)}/>

                                <div className={`w-full px-2 flex flex-row-reverse justify-evenly items-center ${!takingInput ? "hidden" : ""}`}>
                                    
                                    <button type="submit" className='bg-theme rounded-2xl p-3 text-white hover:bg-teal-600 transition-all duration-105'>
                                        <IoIosAdd size={30}/>
                                    </button>
                                    <ul className='list-none w-3/5'>
                                        {colorList.map(curr=>(
                                            <li key={curr} id='curr' className='inline-grid h-8 w-8 mx-0.5 cursor-pointer rounded-full hover:brightness-130 hover:scale-102 transition-all duration-105 ' style={{backgroundColor:curr, border: (noteColor==curr || curr==null) ? "1px solid white" : ""}} onClick={()=>setNoteColor(curr)}></li>                            
                                        ))}
                                    </ul>
                                </div>
                            </form>


                    </div>

                    {isLoading ? <Loader/> : 
                    <>
                        {notes?.length==0 ? 
                            <div className='min-h-96 w-full text-gray-500 text-3xl flex flex-col justify-center items-center gap-y-4'>
                                <IoLogoOctocat size={90}/>
                                <h1>Wow such empty!</h1>
                            </div> : 
                            <div className="columns-2 gap-5 sm:columns-3 sm:gap-5 md:columns-3 lg:columns-4 xl:columns-5 md:px-10">
                                    {notes?.map((note)=>(
                                        <motion.div
                                        initial={{x:'10%'}}
                                        animate={{x:'0%'}}
                                        transition={{duration:0.2, ease:'easeIn'}}
                                        className='w-full'>
                                            <NoteCard key={note._id} note={note} />
                                        </motion.div>
                                    ))}
                            </div>
                        }
                    </>}

                    {/* {notes?.length==0 ? 
                        <div className='min-h-96 w-full text-gray-500 text-3xl flex flex-col justify-center items-center gap-y-4'>
                            <IoLogoOctocat size={90}/>
                            <h1>Wow such empty!</h1>
                        </div> : (isLoading ? <Loader/> : 
                            <div className="columns-2 gap-5 sm:columns-3 sm:gap-5 md:columns-3 lg:columns-4 xl:columns-5 md:px-10">
                                
                                <AnimatePresence>
                                    {notes?.map((note)=>(
                                        <motion.div
                                        initial={{x:'10%'}}
                                        animate={{x:'0%'}}
                                        transition={{duration:0.2, ease:'easeIn'}}
                                        className='w-full'>
                                            <NoteCard key={note._id} note={note} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                    
                            </div>
                        )

                    } */}

                </div>
            </div>

            <Outlet/>
        </>
    )
}

export default Dashboard;