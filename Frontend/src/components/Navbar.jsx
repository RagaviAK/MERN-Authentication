import React, { useContext,useState } from 'react'
import {assets} from "../assets/assets"
import {  useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const Navbar = () => {
  const [loading,setLoading]=useState(false)
    const navigate=useNavigate();
    const {userData,setIsLoggedIn,backend,setUserData}=useContext(AppContent)
    const AccountLoggedOut=async()=>{
      try {
        axios.defaults.withCredentials=true;
        const {data}=await axios.post(backend+'api/auth/logout')
       data.success && setIsLoggedIn(false)
          data.success && setUserData(false)
          navigate('/')
        
      } catch (error) {
        toast.error(error.message)
      }
    }
    const sendVerificationOtp=async()=>{
      setLoading(true)
      try {
        
        const {data}=await axios.post(backend+'api/auth/send-verify-otp');
        if(data.success){
       
          navigate('/Email-verify');
             toast.success(data.message);
        }
        else{
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(error.message);
      }
      finally{
        setLoading(false)
      }
    }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="auth-logo" className='w-28 sm:w-32'/>
 {loading && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <p className="text-lg font-semibold">⏳ Please wait, loading...</p>
    </div>
  </div>
)}


{     userData?  
      <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
       
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black  rounded pt-10'>
          <ul className='list-none bg-gray-100 m-0 p-2 text-sm'>
          
            {!userData.isVerified && <li className='px-2 py-1 cursor-pointer hover:bg-gray-200'onClick={sendVerificationOtp}>Verify email</li>}
            <li className='px-2 py-1 cursor-pointer hover:bg-gray-200 pr-10' onClick={AccountLoggedOut}>Logout</li>
          </ul>
          </div>
        </div>

      :<button onClick={()=>navigate('/login')}
        className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2
        text-gray-800 hover:bg-gray-100 transition-all'>Login <img src={assets.arrow_icon}/></button>
}
   
    </div>
  )
}

export default Navbar