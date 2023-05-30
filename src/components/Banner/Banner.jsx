import React from 'react'

export default function Banner() {
  return (
    <div  style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)), url('https://images.pling.com/img/00/00/62/69/92/1970354/windows-11-blue-violet-structure-microsoft-stock1.jpeg')`,
        backgroundPosition: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '240px'
      }} className='text-center text-white py-5'>
     <h1  className='mt-5'>
     Top jobs board for professionals
     </h1>
     <p>Discover your next career move with over 15 000 opening vacancies, customer support, sowtware, design anywhere in the world or remotely.</p>
    </div>
  )
}
