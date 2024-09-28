import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-image-crop/dist/ReactCrop.css";

import AnimatedRoutes from './AnimatedRoutes';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import NoteEdit from './components/NoteEdit';
import UserSettings from './components/UserSettings';
import UploadProfilePicture from './pages/UploadProfilePicture';

function App() {
  return (
    <>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AnimatedRoutes/>}>
					<Route path='/' element={<Welcome/>}/>
					
					<Route path='/login' element={<Login/>}/>
					<Route path='/register' element={<Register/>}/>
					<Route path='/profilePicture' element={<UploadProfilePicture/>}/>
				</Route>
				<Route path='/dashboard' element={<Dashboard/>}>
					<Route path='/dashboard/:id' element={<NoteEdit/>}/>
					<Route path='/dashboard/settings' element={<UserSettings/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
		<ToastContainer />
    </>
  )
}

export default App;


