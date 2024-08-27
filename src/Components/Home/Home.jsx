import React from 'react'

import { useState } from 'react'
import Style from "./Home.module.css"
import { useEffect } from 'react'
import axios from 'axios'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'
export default function () {




    return (
       <>
       <MainSlider/>
       <CategorySlider/>
       <RecentProducts/>
       </>
    )
}
