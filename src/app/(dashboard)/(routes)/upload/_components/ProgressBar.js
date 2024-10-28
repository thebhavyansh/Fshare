import React from 'react'

function ProgressBar({progress}) {
  return (
    <div className='bg-gray-400 w-full mt-3 rounded-full text-center'>
        <div className=' bg-primary py-0.2 rounded-full text-white' style={{width:`${progress}%`}}> {`${Number(progress).toFixed(0)}%`}</div>
       
    </div>
  )
}

export default ProgressBar