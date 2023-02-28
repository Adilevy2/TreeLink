import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div style={{minHeight:'37.5rem'}} className='grid place-items-center bg-neutral-700 fixed w-full'>
            <div className='grid place-items-center'>

            <h1 className='text-4xl text-center font-mono font-semibold text-slate-200'>Welcome to Tree-Links</h1>
            <Link to='/login'>
            <button className="transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110 w-72 mt-8 order-last whitespace-nowrap rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500">Let's Start</button>
            </Link>
            </div>


        </div>
    );
}

export default MainPage;
