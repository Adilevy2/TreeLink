import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';
import LetsStart from './LetsStart';
import Display from './Display';
import ShowCase from './ShowCase';
import EditLinks from './EditLinks';
import Stats from './Stats';
import Page404 from './Page404';

const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signUp' element={<SignUp/>}/>
                <Route path='/letsStart' element={<LetsStart/>}/>
                <Route path='/display' element={<Display/>}/>
                <Route path='/showCase/:name' element={<ShowCase/>}/>
                <Route path='/editLinks' element={<EditLinks/>}/>
                <Route path='/stats' element={<Stats/>}/>
                <Route path='/error404' element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
