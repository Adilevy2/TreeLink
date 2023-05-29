import { React, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Display = () => {
    let decode={}
    const navigate=useNavigate()
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [pageColor, setpageColor] = useState('');
    useEffect(() => {
        async function getData(){
            if(localStorage.getItem('token')){
                decode=jwtDecode(localStorage.getItem('token'))
                setName(decode.name)
                setImage(decode.image)
                setpageColor(decode.pageColor)
           }
           else{
               navigate('/')
           }
        const submit=await axios.get(`https://treelink.onrender.com/api/getUserLinks/${decode.name}`)
        setData(submit.data)}
        getData()
    }, []);
    return (
        <div>
       <div style={{minHeight:'37.5rem',backgroundColor:pageColor}} className='grid place-items-center absolute w-full'>
        <div className='grid place-items-center w-9/12'>
        <h1 className='text-4xl text-center font-mono font-semibold text-slate-200'>Display : </h1>
        <img className='rounded-full h-36 mt-10 w-36' src={image.url}></img>
        <h1 className='text-4xl mt-8 text-center font-mono font-semibold text-slate-200'>{name}</h1>
        <div className='w-full'>
        {data.length==0?'':data.links.map(ev=>
        <a href={ev.link}>

            <button className="drop-shadow-2xl transition w-full ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 w-72 mt-8 order-last whitespace-nowrap rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500">
                <p>
                {ev.name}
                </p>
                <p className='text-gray-600'>
                    {ev.description}
                </p>
                </button>
        </a>
            )}
            <HamburgerMenu/>

            </div>
            <p className='text-white mt-8 mb-10'><span className='font-bold mr-6 text-black'>link to your page : </span><a className='hover:underline' href={`https://main--glistening-mermaid-92ee50.netlify.app/showCase/${name}`}> https://main--glistening-mermaid-92ee50.netlify.app/showCase/{name}</a></p>
        </div>
    </div>
            </div>
    );
}

export default Display;
