import { useState } from 'react'
import React from 'react'

import Style from "./Footer.module.css"
import { useEffect } from 'react'
export default function () {
    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting Footer");

    }, []);
    return (
        <div>
            <h2>Footer</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, atque.</p>
        </div>
    )
}
