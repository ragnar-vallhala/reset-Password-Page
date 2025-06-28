import React from 'react'
import {FaLock} from 'react-icons/fa'
const PaaswordBox = ({label, password ,setpassword}) => {
  return (
    <div className='password relative'>
      <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5' color='0b666a' />
      <input type='text' placeholder={label} className='pl-10'
      value={password}
      onChange={(event)=>setpassword(event.target.value)}
       />
    </div>
  )
}

export default PaaswordBox