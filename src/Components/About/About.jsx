import { useState } from 'react'
import React from 'react'

import Style from "./About.module.css"
import { useEffect } from 'react'
export default function () {
    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting About");

    }, []);
    return (
        <div>
            <h2>About</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, atque.</p>
        </div>
    )
}
