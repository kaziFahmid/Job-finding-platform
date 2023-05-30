import React, {  useEffect, useState } from 'react'
import Headings from '../Headings/Headings'
import Category from '../Category/Category'



export default function PopularJob() {

    const [categories,setCategories]=useState([])
    useEffect(()=>{
        fetch('https://job-server-eight.vercel.app/categories')
        .then(res=>res.json())
        .then(data=>setCategories(data))
    },[])
  return (
    <>
    <div className='mt-5'>
    <Headings title={"Popular Job Categories"} text={"Choose your favourite categories"}/>
    </div>

    <div className='container mx-auto d-flex  flex-column flex-md-row gap-5 ' >
{categories.map((category)=><Category key={category._id} {...category}/>)}
    </div>


    </>
  )
}
