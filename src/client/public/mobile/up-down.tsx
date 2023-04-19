import React from 'react'

type Props = {
  openModal?: boolean;
}

const UpDownSvg = ({ openModal }: Props) => {
  return (
    <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className='transition-all duration-300 ease-in-out'>
      <path d="M24.3335 27V13" stroke={openModal ? "#FFF" : "#6A3B0D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.667 17.6667L24.3337 13L29.0003 17.6667" stroke={openModal ? "#FFF" : "#6A3B0D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.667 13L15.667 27" stroke={openModal ? "#FFF" : "#6A3B0D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.3335 22.3333L15.6668 27L11.0002 22.3333" stroke={openModal ? "#FFF" : "#6A3B0D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default UpDownSvg