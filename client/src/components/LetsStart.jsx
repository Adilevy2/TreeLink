import jwtDecode from 'jwt-decode';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const LetsStart = () => {
    const [inputs, setInputs] = useState([{ name: "",link:"",description:"" }]);
    const [pageColor, setPageColor] = useState('rgb(64 64 64)');
    const [name, setName] = useState('');
    const navigate=useNavigate()

    const handleChange = (i, event,name) => {
        const values = [...inputs];
        let nameValue=name;
        values[i][nameValue] = event.target.value;
        setInputs(values);
      };

    const handleRemoveInput = (i) => {
        const values = [...inputs];
        values.splice(i, 1);
        setInputs(values);
      };

      const handleAddInput = () => {
        setInputs([...inputs, { name: "",link:"",description:"" }]);
      };

      const handleSubmit=async(e)=>{
            e.preventDefault()
            try{
            for(let i=0;i<inputs.length;i++){
                const decode=jwtDecode(localStorage.getItem('token'))
                const submitValues=await axios.post(`https://treelink-server.onrender.com/api/links`,{nameUser:decode.name,name:inputs[i].name,link:inputs[i].link,description:inputs[i].description})
              }
              const decode=jwtDecode(localStorage.getItem('token'))
              const submitValues=await axios.put(`https://treelink-server.onrender.com/api/UpdatePageColor`,{pageColor:pageColor,name:decode.name})
              localStorage.setItem('token',submitValues.data)   
            }
              catch{
                alert('oops,somthing went wrong')
              }
            navigate('/display')
    }

    useEffect(() => {
      async function getData(){
        if(localStorage.getItem('token')){
          const decode=jwtDecode(localStorage.getItem('token'))
          setName(decode.name)
        }
        else{
          navigate('/')
        }
      }
      getData()
    }, []);
    
      return (
        <div>
            <div className='fixed'>

            <HamburgerMenu/>
            </div>
            <div style={{minHeight:'37.5rem'}} className='grid place-items-center bg-neutral-700 absolute w-full'>
        <div className='grid place-items-center w-10/12'>
        <h1 className='text-4xl text-center font-mono font-semibold text-slate-200'>Hello {name}, Lets start your tree </h1>
        <label className='text-xl mt-6 mb-2 text-center font-mono font-semibold text-slate-200'>First, Let's choose a color for your page(optional)</label>
           <input onChange={(ev)=>setPageColor(ev.target.value)} type='color' className='border-solid border-2 border-slate-400 hover:border-slate-500 rounded-md w-24 h-10'></input>
           <div className='mt-8 w-full '>
        <form className='grid place-items-center pb-20' onSubmit={(ev)=>handleSubmit(ev)}>
        <div className='w-full'>

        {inputs.map((input, i) => (
            <div className='' key={i}>
                        <h1 className='text-xl text-center font-mono font-semibold text-slate-200'>Link {i+1}</h1>
            <input onChange={(event) => handleChange(i, event,'name')} value={input.name} name="name" type="text"  required className=" relative block w-full  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder='Link name'/>
            <input onChange={(event) => handleChange(i, event,'link')} value={input.link}  name="link" type="text"  required className="mt-4 relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder='Link'/>
            <input onChange={(event) => handleChange(i, event,'description')} value={input.description}  name="description" type="text" className=" mt-4 mb-8 relative block w-full  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder='Descrioption(optional)'/>
          {i > 0 && (
              <button onClick={() => handleRemoveInput(i)} type="button" className="bg-red-500 mb-8 inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">remove link</button>
              
              )}
              </div>
      ))}
      </div>
      <button onClick={()=>handleAddInput()} type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Add another link</button>
      <button type='submit' className=" transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 w-72 mt-8 order-last whitespace-nowrap rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500">Submit Links</button>
                </form>
      </div>
      </div>
     

        </div>
    </div>
    );
}

export default LetsStart;
