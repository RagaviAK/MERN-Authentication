import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';



const LoginPage = () => {
    const [state,setState]=useState('Sign Up');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const {backend,setIsLoggedIn,getUserData,isLoggedIn}=useContext(AppContent)
    const onSubmitHandler=async(e)=>{
      setLoading(true);
      try {
        axios.defaults.withCredentials=true;
        e.preventDefault();
        if(state=='Sign Up'){
          const {data}=await axios.post(backend+'api/auth/register',{name,email,password})
          if(data.success){
            setIsLoggedIn(true);
         getUserData();
            navigate('/');

          }
          else{
            toast.error(data.message);

          }
          console.log(isLoggedIn)
        }
        else{
          const {data}=await axios.post(backend+'api/auth/login',{email,password})
          if(data.success){
            setIsLoggedIn(true);
            getUserData();
            navigate('/');
       

          }
          else{
            toast.error(data.message);

          }
        }
        
      } catch (error) {
        
         toast.error(error.message);
      }
      finally{
        setLoading(false);
      }
    }

    

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400' >
             <img src={assets.logo} alt="auth-logo" onClick={()=>navigate('/')} className='w-28 sm:w-32 absolute left-5 sm:left-20 top-5 cursor-pointer'/>
             <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-center mb-3 text-white'>{state=='Sign Up'?'Create Account':'Login'}</h2>
                <p className='text-center text-sm mb-6'>{state=='Sign Up'?'Create your Account':'Login to your Account'}</p>
                <form onSubmit={onSubmitHandler}>
                  {state=='Sign Up' &&(
                    <div className='flex items-center gap-3 px-5 py-2.5 w-full rounded-full mb-4 bg-[#333A5C]'>
                        <img src={assets.person_icon} alt="person-icon"/>
                        <input 
                        onChange={e=>setName(e.target.value)}
                        value={name}
                        type="text" placeholder='Full Name' className='outline-none bg-transparent' required/>
                    </div>
                    
                  )}
                  
                     <div className='flex items-center gap-3 px-5 py-2.5 w-full rounded-full mb-4 bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="email-icon"/>
                        <input 
                          onChange={e=>setEmail(e.target.value)}
                        value={email}
                        type="email" placeholder='Email ID' className='outline-none bg-transparent' required/>
                    </div>
                     <div className='flex items-center gap-3 px-5 py-2.5 w-full rounded-full mb-4 bg-[#333A5C]'>
                        <img src={assets.lock_icon} alt="lock-icon"/>
                        <input
                          onChange={e=>setPassword(e.target.value)}
                        value={password}
                         type="password" placeholder='Password' className='outline-none bg-transparent' required/>
                    </div>
                    <p className='text-indigo-500 mb-4 cursor-pointer' onClick={()=>navigate('/Reset-Pass')}>Forgot password?</p>
                    <button className='w-full text-white bg-indigo-500 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer'>{state=='Sign Up'?'Sign Up':'Login'}</button>
                   { state=='Sign Up'? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
                      <span className='text-blue-400 cursor-pointer underline' onClick={()=>setState('Login')}>Login here</span>
                    </p>):(<p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
                      <span className='text-blue-400 cursor-pointer underline' onClick={()=>setState('Sign Up')}>Sign up</span>
                    </p>)}
                   
                </form>
              {loading && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <p className="text-lg font-semibold">⏳ Please wait, loading...</p>
    </div>
  </div>)}

             </div>
        
    </div>
  )
}

export default LoginPage