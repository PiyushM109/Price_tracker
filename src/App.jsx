import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import GetAllProducts from './Components/GetAllProducts'
const App = () => {
  return (
    <div className='w-[100%]'>
      <Navbar />
      <Hero />
      <GetAllProducts />
      </div>
  )
}

export default App