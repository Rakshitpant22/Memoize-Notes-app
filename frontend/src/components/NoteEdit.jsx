import React, { useState, useRef, useEffect } from 'react';
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote, deleteNote } from '../redux/noteSlice';
import {motion, AnimatePresence} from 'framer-motion';

function NoteEdit() {

    const {notes} = useSelector(state=>state.notes);
    const {dark} = useSelector(state=>state.theme);
    const {id} = useParams();
    const [currNote,setCurrNote] = useState(notes.find(note=>(note._id==id)));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const colorList = [null,'#FF9D76','#FB3569','#AC87C5','#2D9596','#789461','#B47B84','#C69774']
    const [noteColor,setNoteColor] = useState(currNote.color);

    

    const ref = useRef(null);

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

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            id: id,
            title: e.target.title.value,
            text: e.target.text.value,
            color: noteColor,
        }
        dispatch(updateNote(data));
        navigate('/dashboard');
    }

    const deleteNoteHandler = () => {
        dispatch(deleteNote(id));
        navigate('/dashboard');
    }
    
    return (
        <div className={`${dark ? "dark" : ""}`}>
            <div className=' min-w-full min-h-screen flex flex-wrap items-center justify-evenly bg-zinc-900 bg-opacity-70 fixed top-0'>

                <motion.div
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                transition={{duration:0.15, ease:'easeOut'}}
                className='flex items-center justify-center w-full'
                >
                    <div className={`w-2/3 md:w-1/2 xl:w-1/3 p-4 my-3 flex flex-wrap justify-center rounded-lg text-black dark:text-white brightness-110 dark:brightness-80 ${noteColor=="none" || noteColor==null ? "border-2 border-zinc-600 dark:border-zinc-300" : ""}`} style={{backgroundColor:noteColor}} ref={ref}>

                        <form onSubmit={handleSubmit} className='flex flex-wrap content-center items-center justify-center gap-x-6'>

                            <textarea rows="2" type="text" defaultValue={currNote.title} name="title" id="title" placeholder='Title' className={`bg-transparent focus:outline-none p-2 text-2xl w-full `}/>

                            <textarea type="text" defaultValue={currNote.text} name="text" id="text" placeholder='Create new note . . .' 
                            rows='10' className={`bg-transparent focus:outline-none w-full p-2  `} />

                            <ul className='list-none w-3/5'>
                                {colorList.map(curr=>(
                                    <li key={curr} id='curr' className='inline-grid h-8 w-8 mx-0.5 cursor-pointer rounded-full hover:brightness-130 hover:scale-102 transition-all duration-105' style={{backgroundColor:curr, border: noteColor==curr || curr==null ? "1px solid white" : ""}} onClick={()=>setNoteColor(curr)}></li>                            
                                ))}
                            </ul>
                            <div className='flex items-center gap-x-2'>
                                <button className='bg-theme rounded-2xl p-3 text-white hover:bg-teal-600 transition-all duration-105' onClick={deleteNoteHandler}>
                                    <MdDelete size={25}/>
                                </button>
                                <button type='submit' className='bg-theme rounded-2xl p-3 text-white hover:bg-teal-600 transition-all duration-105'>
                                    <MdCloudUpload size={25}/>
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default NoteEdit;