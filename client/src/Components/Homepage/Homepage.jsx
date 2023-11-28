import React from 'react'
import Hero from './Hero'
import Locations from './Locations'
import newloc from './newloc'
import Aboutussection from './Aboutussection'
import NewEvents from './NewEvents'
import PopularEvents from './PopularEvents'
import PackageEvents from './PackageEvents'

function Homepage() {
  return (
    <div>
      <Hero/>
      <Locations/>
      <hr></hr>
      <NewEvents/>
      <hr className='mt-32'></hr>
      <PopularEvents/>
      <hr className='mt-32'></hr>
      <PackageEvents/>
      <hr className='mt-32'></hr>
      <Aboutussection/>
    </div>
  )
}

export default Homepage