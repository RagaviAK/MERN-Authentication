import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ResetPassPage from './pages/ResetPassPage'
import EmailVerifyPage from './pages/EmailVerifyPage'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div >
      <ToastContainer/>
   
      <Routes>
        <Route path='/' element={<HomePage/>}/>
           <Route path='/login' element={<LoginPage/>}/>
              <Route path='/Reset-Pass' element={<ResetPassPage/>}/>
                 <Route path='/Email-verify' element={<EmailVerifyPage/>}/>
      </Routes>
      
      </div>
  )
}

export default App;