import { React, useEffect, useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AllContext } from '../Context/context';
import HamburgerMenu from './HamburgerMenu';
import AddLink from './AddLink';

const EditLinks = () => {
    let decode={}
    const navigate=useNavigate()
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [pageColor, setPageColor] = useState('');
    const [image, setImg] = useState('');
    const {addLink, setAddLink,UserName, setUserName}=useContext(AllContext)
    const setImgUrl = (e) => {
        const file = e.target.files[0]; // defines file as an object who contain image data
        const reader = new FileReader(); // defines new instance from FileReader class
        reader.readAsDataURL(file); // converts the file to base64
        //func that get the image in base64 and add it to newArticle object
        reader.onloadend = () => {
          setImg(reader.result);
        };
      };
    useEffect(() => {
        async function getData(){
            if(localStorage.getItem('token')){
                decode=jwtDecode(localStorage.getItem('token'))
                setName(decode.name)
           }
           else{
               navigate('/')
           }
        const submit=await axios.get(`https://treelink.onrender.com/api/getUserLinks/${decode.name}`)
        setData(submit.data)}
        getData()
    }, []);  

    const handleDelete=async(id)=>{
        const submit=await axios.delete(`https://treelink.onrender.com/api/links/${id}`)
        window.location.reload(false);
    }
    const handleChangeColor=async()=>{
        
        try{

            if(localStorage.getItem('token')){
                decode=jwtDecode(localStorage.getItem('token'))
                setName(decode.name)
            }
            else{
           navigate('/')
       }
       const submitValues=await axios.put(`https://treelink.onrender.com/api/updatePageColor`,{pageColor:pageColor,name:decode.name})
       localStorage.setItem('token',submitValues.data)   ;
       window.location.reload(false);
    }
    catch{
        alert('oops, something went wrong')
    }

    }
    const handleChangeImage=async(e)=>{
        e.preventDefault()
        try{

            if(localStorage.getItem('token')){
                decode=jwtDecode(localStorage.getItem('token'))
            }
            else{
           navigate('/')
       }
       const submitValues=await axios.put(`https://treelink.onrender.com/api/updateImage`,{name:decode.name,image:image})
       localStorage.setItem('token',submitValues.data)   ;
       window.location.reload(false);
    }
    catch{
        alert('oops, something went wrong')
    }

    }
    return (
        <div>
            {
                addLink &&
                <AddLink/>
            }
       <div style={{minHeight:'37.5rem',backgroundColor:data.pageColor}} className='grid place-items-center bg-neutral-700 absolute w-full'>
        <div className='grid place-items-center w-9/12 '>
            <div className='grid grid-cols-8 w-full'>
            <div className='col-start-1 col-end-3'>
        <label className='text-xl text-center font-mono font-semibold text-slate-200'>Change Page color</label>
        <div className='flex mt-6'>
           <input onChange={(ev)=>setPageColor(ev.target.value)} type='color' className=' border-solid border-2 border-slate-400 hover:border-slate-500 rounded-md w-24 h-10'></input>
            <button onClick={()=>handleChangeColor()} className='ml-8 whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium w-24 h-10 text-white shadow-sm hover:bg-blue-800'>change</button>
        </div>
            </div>
            <div className='col-start-6 col-end-9 '>
            
        <label className='text-xl text-center font-mono font-semibold text-slate-200'>Change Picture</label>
            <form onSubmit={(e)=>handleChangeImage(e)}>
        <div className='flex mt-6'>

            <input onChange={(e) => setImgUrl(e)} required type="file" class="block w-min text-sm text-slate-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"/>
                <button type='submit' className='ml-8 whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium w-24 h-10 text-white shadow-sm hover:bg-blue-800'>change</button>
      </div>
      </form>
      </div>
      </div>
        <div className='w-full'>
        {data.length==0?'':data.links.map(ev=>
        <div>
            <button className="drop-shadow-2xl transition w-full ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 w-72 mt-8 order-last whitespace-nowrap rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500">
                <p>
                {ev.name}
                </p>
                <p className='text-gray-600'>
                    {ev.description}
                </p>
                </button>
                <p className='sr-only' id='idList'>{ev._id}</p>
        <button onClick={()=>handleDelete(document.activeElement.previousSibling.innerText)} className="mt-8 order-last whitespace-nowrap rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600">Delete</button>
            </div>
            )}
            <HamburgerMenu/>
            </div>
                  <button onClick={()=>{setAddLink(true);setUserName(name)}} type='button' className=" mb-14 transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 w-72 mt-8 order-last whitespace-nowrap rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700">Add another Link</button>
        </div>
    </div>
            </div>
    );
}

export default EditLinks;






