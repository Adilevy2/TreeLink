import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Page404 from './Page404';

const ShowCase = () => {
    const params=useParams()
    const [data, setData] = useState([]);
    const [image, setImage] = useState('');
    const navigate=useNavigate()
    useEffect(() => {
        async function getData(){
        const submit=await axios.get(`http://localhost:4905/api/getUserLinks/${params.name}`)
        if(submit.data=='invalid name')
        setData('invalid name')
        setImage(submit.data.image.url)
        setData(submit.data)}
        getData()
    }, []);  

    const date=new Date()
    const handleClick=async(id)=>{
       
        const submit=await axios.put(`http://localhost:4905/api/clicks`,{id:id,date:date})
    }
   console.log(data)
      return (
        <div>
            {data=='invalid name'?
            <Page404></Page404>:
        
        
       <div style={{minHeight:'37.5rem',backgroundColor:data.pageColor}} className='bg-neutral-700 absolute w-full'>
        <div className='grid place-items-center w-9/12 ml-40'>
        <img className='rounded-full h-36 mt-6 w-36' src={image}></img>
        <h1 className='text-4xl mt-8 text-center font-mono font-semibold text-slate-200 mb-8'>{params.name}</h1>
        <div className='w-full'>

        {data.length==0?'':data.links.map(ev=>
        <a href={ev.link}>
            <p className='sr-only' id='idList'>{ev._id}</p>
            <button onClick={()=>handleClick(document.activeElement.previousSibling.innerText)} className="mb-8 drop-shadow-2xl transition w-full ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 w-72 order-last whitespace-nowrap rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500">
                <p>
                {ev.name}
                </p>
                <p className='text-gray-600'>
                    {ev.description}
                </p>
                </button>
        </a>
            )}

            </div>
        </div>
    </div>}
            </div>
    );
}

export default ShowCase;
