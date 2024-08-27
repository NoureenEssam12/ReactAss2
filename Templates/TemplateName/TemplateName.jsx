import React from 'react'
import { useState } from 'react'
import Style from "./TemplateName.module.css"
import { useEffect } from 'react'
export default function () {
    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting TemplateName");

    }, []);
    return (
        <div>
            <h2>TemplateName</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, atque.</p>
        </div>
    )
}
