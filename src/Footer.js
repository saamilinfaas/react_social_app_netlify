import React from 'react'

const Footer = () => {
  const today = new Date();
  return (
    <footer className='Footer'>
        <p>Copy right &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer