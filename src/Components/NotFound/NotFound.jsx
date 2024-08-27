import React from 'react'
import { useState } from 'react'
import Style from "./NotFound.module.css"
import { useEffect } from 'react'
export default function () {
    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting NotFound");

    }, []);
    return (
        <div>
            <h2>NotFound</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, atque.</p>
        </div>
    )
}
