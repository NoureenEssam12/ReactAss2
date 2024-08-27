import React from 'react'
import { useState } from 'react'
import Style from "./Allorders.module.css"
import { useEffect } from 'react'
export default function () {
    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting Allorders");

    }, []);
    return (
        <div>
            <h2>Allorders</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, atque.</p>
        </div>
    )
}
