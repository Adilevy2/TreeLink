import {useFormik} from 'formik'
import { useContext,useState } from 'react';
import { AllContext } from '../Context/context';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const AddLink = () => { 
    const formik=useFormik({
    initialValues:{
        name:'',
        link:'',
        description:''
    }
});  
const {setAddLink}=useContext(AllContext)
let decode={}
const navigate=useNavigate()
const handleSubmit=async()=>{
  try{
      if(localStorage.getItem('token')){
        decode=jwtDecode(localStorage.getItem('token'))
      }
      else{
        navigate('/')
      }
      let values=formik.values;
      values['nameUser']=decode.name;
      const submit=await axios.post('http://localhost:4905/api/links',values)
      setAddLink(false)
      window.location.reload(false);

      
  }
  catch{
      alert('oops,somthing went wrong')
  }
}
    return ( 
        <div>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
 
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start items-center justify-center">
          
  <div className="w-full max-w-md space-y-8 ">
    <div >
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-sans">New Link</h2>
    </div>
    <form className="mt-8 space-y-6" >
      <input type="hidden" name="remember" value="true"/>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <input  onChange={formik.handleChange} placeholder='name'  name="name" type="text"  required className="relative block w-full  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <input  onChange={formik.handleChange} placeholder='link'  name="link" type="text"  required className="mt-4 relative block w-full  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
          <input  onChange={formik.handleChange} placeholder='description' name="description" type="text" className="mt-4 relative block w-full  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>
      </div>

    </form>
  </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={()=>setAddLink(false)}  type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
          <button onClick={()=>handleSubmit()} type="button" className="mt-3 bg-green-300 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Add</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
     );
}
 
export default AddLink;