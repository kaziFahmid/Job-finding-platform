import React from 'react'
import Banner from '../Banner/Banner'
import Aboutus from '../Aboutus/Aboutus'
import PopularJob from '../PopularJob/PopularJob'
import Company from '../Company/Company'

export default function Home() {
  return (
   <>
   <Banner/>

   <PopularJob/>
   
  <div style={{marginTop:'120px'}}>
  <Aboutus/>
  </div>
   <Company/>
   </>
  )
}
