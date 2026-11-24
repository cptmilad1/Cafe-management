import React from 'react'
import CafeIcon from '../cafeIcon/CafeIcon'

function NavBar() {
  return (
    <div className='w-19/20 rounded-full flex backdrop-blur-sm m-4 shadow-[2px_2px_10px_rgba(0,0,0),inset_1px_1px_10px_rgba(225,225,225,0.5),inset_0_0_100px_rgba(0,0,0,0.2)] text-white'>
        <div className='w-full'>
          <CafeIcon/>
        </div>
    </div>
  )
}

export default NavBar