import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { StateContext } from '../Context/AuthProvider'

const Home = () => {

    const {
        name, 
        setName, 
        email, 
        setEmail, 
        password, 
        setPassword, 
        confirmPassword, 
        setConfirmPassword,
    } = useContext(StateContext);

    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const [redAlert, setRedAlert] = useState(false);
    const [greenAlert, setGreenAlert] = useState(false);

    const navigate = useNavigate();

    const checkName =(e)=>{
        setName(e.target.value);
        if(name.length===0){
            setValidName(false);
        }
       
        else{
            setValidName(true);
        }
    }

    const checkEmail =(e)=>{
        setEmail(e.target.value);
        if(email.length===0){
            setValidEmail(false);
        }
        
        else
        {
            setValidEmail(true);
        }
    }

    const checkPassword =(e)=>{
        setPassword(e.target.value);
        if(password.length===0){
            setValidPassword(false);
        }else{
            setValidPassword(true);
        }
    }

    const checkConfirmPassword =(e)=>{
        setConfirmPassword(e.target.value);
        if(confirmPassword.length ===0 ){
            setValidConfirmPassword(false);
        }else{
            setValidConfirmPassword(true);
        }
    }


    const onSubmit=()=>{
        if(!validName || !validEmail || (password !== confirmPassword) || !validPassword){
            console.log("Invalid")
            setRedAlert(true);
            setGreenAlert(false);
          
        }else{
            setRedAlert(false);
            setGreenAlert(true);
            window.localStorage.setItem("localName", name);
            window.localStorage.setItem("localEmail", email);
            window.localStorage.setItem("localPassword", password);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                navigate('/profile');
            },500);
        }
    }

    useEffect(() => {
        if(window.localStorage.getItem("localName")){
            setTimeout(()=>{
                navigate('/profile');
            }, 500)
        }
    }, [])
    

  return (
    <div className='h-full w-[90%] ml-20 flex'>
        <div className='mt-10 basis-1/3 '>
            <h2 className='text-3xl text-black'>Sign Up</h2>
            <div className='mt-5 shadow-2xl  px-8 pt-6 pb-8 '>
                <div className='border border-transparent border-b-gray-500 mt-1'>
                    <input 
                        placeholder='Full Name' 
                        className='bg-transparent text-gray-700 h-10 w-full outline-none' 
                        value={name} 
                        onChange={checkName} />
                </div>

                <div className=' border border-transparent border-b-gray-500 mt-1'>
                    <input 
                        placeholder='Email' 
                        className='bg-transparent text-gray-700 h-10 w-full outline-none' 
                        value={email} 
                        onChange={checkEmail}  />
                </div>

                <div className=' border border-transparent border-b-gray-500 mt-1'>
                    <input 
                        placeholder='Password' 
                        className='bg-transparent text-gray-700 h-10 w-full outline-none' 
                        value={password} 
                        onChange={checkPassword} />
                </div>

                <div className=' border border-transparent  border-b-gray-500 mt-1'>
                    <input 
                        placeholder='Confirm Password' 
                        className='bg-transparent text-gray-700 h-10 w-full outline-none'  
                        value={confirmPassword} 
                        onChange={checkConfirmPassword} />
                </div>

                <div className='py-5'>
                    <h2 className={`text-red-800 ${!redAlert?"hidden":"flex"}`}>Error: All the fields are mandatory</h2>
                    <h2 className={`text-green-700  ${!greenAlert?"hidden":"flex"}`}>Successfully Signed Up!</h2>
                </div>

                <button onClick={onSubmit} className='bg-indigo-700	 text-white w-28 rounded-sm p-2'>Signup</button>
            </div>
           
        </div>
        <div className='basis-1/2 ml-40 mt-10'>
        <img src="https://www.nicepng.com/png/full/192-1924170_recently-a-lot-of-people-talk-about-cryptocurrency.png"></img> 
    </div>
    </div>
  )
}

export default Home