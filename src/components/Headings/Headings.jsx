import React from 'react'

export default function Headings({title,text}) {
  return (
    <div className='text-center container mx-auto ' style={{marginTop:'140px'}}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}
