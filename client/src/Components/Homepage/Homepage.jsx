import React from 'react'
import Hero from './Hero'
import Locations from './Locations'
import newloc from './newloc'
import Aboutussection from './Aboutussection'
import NewEvents from './NewEvents'
import Activities from './Activities'
import Products from './Products'
import AddPlace from './AddPlace'
import AddProduct from './AddProduct'
import SubmitLoc from './SubmitLoc'

function Homepage() {
  return (
    <div className='bg-[#fcf9f3]'>
      <Hero/>
      <Locations/>
      <hr></hr>
      <NewEvents/>
      <hr className='mt-32'></hr>
      <Activities/>
      <hr className='mt-32'></hr>
      <SubmitLoc/>
      <hr className='mt-32'></hr>
      <Products/>
      <hr className='mt-32'></hr>
      <Aboutussection/>
    </div>
  )
}

export default Homepage