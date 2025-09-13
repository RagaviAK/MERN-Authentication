import React, { useContext, useEffect, useRef } from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContent } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerifyPage = () => {
  axios.defaults.withCredentials=true;
  const {backend,getUserData,isLoggedIn,userData}=useContext(AppContent);
  const navigate=useNavigate();

  const inputRef=useRef([]);
  const handleInput=(e,index)=>{
    if(e.target.value.length>0 && index<inputRef.current.length-1){
      inputRef.current[index+1].focus();
    }
  }
  const handleKeyDown=(e,index)=>{
    if(e.key==='Backspace' && e.target.value==='' && index>0){
        inputRef.current[index-1].focus();
    }
  }
  const handlePaste=(e)=>{
    const paste=e.clipboardData.getData('text');
    const pasteArray=paste.split('');
    pasteArray.forEach((char,index)=> {
      if(inputRef.current[index]){
        inputRef.current[index].value=char;
      }
    });
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      const otpArray=inputRef.current.map(e=>e.value);
      const otp=otpArray.join('');
      
      const {data}=await axios.post(backend + 'api/auth/verify-account',{otp})
      if(data.success){
        toast.success(data.message);
       await getUserData();
        navigate('/')
      }
      else{
        toast.error(data.message);
        
      }
     
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(isLoggedIn && userData && userData.isVerified){
      navigate('/');
    }
  },[isLoggedIn,userData])
  return (
    
      <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400' >
                     <img src={assets.logo} alt="auth-logo" onClick={()=>navigate('/')} className='w-28 sm:w-32 absolute left-5 sm:left-20 top-5 cursor-pointer'/>
                <form onSubmit={onSubmitHandler} className='w-96 rounded-lg bg-slate-900 text-sm shadow-lg p-8'>
          <h1 className='text-2xl font-semibold text-center text-white mb-4'>Email Verify OTP</h1>
          <p className='mb-6 text-center text-indigo-300'>Enter the 6-digit code sent to your email id</p>
        
        <div className='flex justify-between mb-8'  onPaste={handlePaste} >
           
          {         
            Array(6).fill(0).map((_,index)=>(
                   <input type="text" maxLength="1" key={index}
                   className='w-12 h-12 bg-[#333A5C] text-white text-center rounded-md text-xl'
                   ref={e=>inputRef.current[index]=e}
                   onInput={e=>handleInput(e,index)}
                   onKeyDown={e=>handleKeyDown(e,index)}
                 
                   />   
            ))
          }
        </div>
        <button className='w-full text-white bg-indigo-500 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 cursor-pointer'>Verify email</button>

        </form>
      </div>
  )
}

export default EmailVerifyPage