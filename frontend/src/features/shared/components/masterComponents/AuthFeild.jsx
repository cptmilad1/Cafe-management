import React from 'react'

function AuthFeild({label, type}) {
  return (
    <div className='flex flex-col gap-5'>
        <label htmlFor="">{label}</label>
        <input type={type} />
    </div>
  )
}

export default AuthFeild