import { useState } from 'react'
import Style from "./LayOut.module.css"
import React from 'react'

import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
export default function () {
    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting LayOut");

    }, []);
    return (
        <div>
          <Navbar/>
<div className="">          <Outlet/> <Footer/>
{/* p-3 pt-5 mx-auto container max-w-screen-xl */}
</div>         

        </div>
    )
}
