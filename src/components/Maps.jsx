import React from 'react'

function Maps() {
  return (
    <div className='w-full flex flex-col items-center jusitfy-center h-[20rem] p-[.5rem]'>
        <iframe className='w-full h-full rounded-md' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13019.94803359182!2d33.3334872!3d35.3311441!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de6de877d17125%3A0xe7e8391c537696f!2sMusmer%20Exchange!5e0!3m2!1sen!2s!4v1697901495741!5m2!1sen!2s"></iframe>
    </div>
  )
}

export default Maps