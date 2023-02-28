import {React,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik'
import axios from 'axios';

const Login = () => {

    const formik=useFormik({
        initialValues:{
            name:'',
            password:''
        }
    });  

    const [message, setMessage] = useState('');
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
            const submit=await axios.post('http://localhost:4905/api/login',formik.values)
            if(submit.data=='invalid name or password')
            return setMessage(<p className="font-medium text-red-500 hover:text-red-600">invalid email or password</p>)
            else if(submit.data=='invalid password')
            return setMessage(<p className="font-medium text-red-500 hover:text-red-600">invalid password</p>)
             else{
                localStorage.setItem('token',submit.data)   
                navigate('/display')
            }
        }
        catch{
            alert('oops,somthing went wrong')
        }
    }
    return (
        <div style={{minHeight:'37.5rem'}} className='grid place-items-center bg-neutral-700 fixed w-full'>
            <div className='grid place-items-center w-4/12'>
            <h1 className='text-4xl text-center font-mono font-semibold text-slate-200'>Login</h1>
            <form className='mt-8 w-full grid place-items-center' onSubmit={(ev)=>handleSubmit(ev)}>
                <input onChange={formik.handleChange} required type='text' name='name' placeholder='name' className=' rounded-md border-indigo-700 border-2 bg-slate-300 placeholder-gray-500 px-7 py-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none'/>
                <input onChange={formik.handleChange} required type='password' name='password' placeholder='password' className='mt-8 rounded-md border-indigo-700 border-2 bg-slate-300 placeholder-gray-500 px-7 py-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none'/>
                <div className='mt-4'>
                {message}
                </div>
                <button type="submit" className="mt-8 mb-8 group relative flex w-7/12 justify-center rounded-sm border border-transparent bg-blue-600 py-2 px-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>Log in
        </button>
        <div className='flex'>
        <span className='text-gray-400'>Not a member?</span>
            <div className='flex'>
        <Link to='/signUp'>
        <span className='text-gray-100 ml-2 hover:underline'>sign up now</span>
        </Link>
            </div>
        </div>

            </form>
            </div>
        </div>
    );
}

export default Login;
