import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {Outlet, useLocation} from 'react-router-dom';


function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence initial={false} mode='sync'>
            {/* {console.log(location.pathname)} */}
            <motion.div
            key={location.pathname}
            initial={{y:'20%'}}
            animate={{y:'0%'}}
            exit={{y:'-20%'}}
            transition={{duration:0.5}}
            className='fixed top-0 w-full min-h-screen'
            >
                <Outlet/>
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;