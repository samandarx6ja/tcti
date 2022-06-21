import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation, useParams} from 'react-router-dom'
import Home from './Screen/Home'
import Test from './Screen/Test'
import Fortest from './Screen/Fortest'
import Testfor from './Screen/Testfor'
import Sidebar from './Components/Sidebar'
import './App.css'
import {useEffect, useState} from "react";

import User from "./Screen/User/User";
import Qabul from "./Screen/Qabul/Qabul";
import UserForAdmin from "./Screen/UserForAdmin/UserForAdmin";
import QrPage from "./Components/PDF/QrPage";

function App() {

    const [language, setLanguage] = useState(Number(localStorage.getItem("language")))
    const [userName, setUserName] = useState(null)

    const {setapp} = useParams();
    useEffect(() => {
        if (!localStorage.getItem("language")) {
            localStorage.setItem("language", "0")
        }
    }, [])

    useEffect(() => {
        setLanguage(Number(localStorage.getItem("language")))
    }, [localStorage.getItem("language")])
    console.log(userName)
    return (
        <Router>
            <div className='App'>

                <Sidebar setapp={setapp} setLanguage={setLanguage} language={language} userName={userName} setUserName={setUserName}/>
                    <Routes>
                        <Route path='/QR/:id/:setapp' element={<QrPage/>}/>
                        <Route path='/' element={<Home language={language} setUserName={setUserName}/>}/>
                        <Route path='/ariza' element={<Test language={language} setUserName={setUserName}/>}/>
                        <Route path='/testfor' element={<Testfor/>}/>
                        <Route path='/user_for_admin/:id' element={<UserForAdmin language={language}/>}/>
                        <Route path='/user' element={<User setUserName={setUserName} language={language}/>}/>
                        <Route path='/qabul' element={<Qabul language={language} />}/>
                        <Route path='/fortest' element={<Fortest setUserName={setUserName} language={language}/>}/>
                    </Routes>
            </div>
        </Router>
    )
}

export default App
