import React from 'react'

type Props = {
  bgColor?: string
}

const FullLoading = ({ bgColor = 'rgb(0 0 0 / 0.4)' }: Props) => {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center w-screen h-screen backdrop-opacity-60 backdrop-blur-[200px]'
      style={{
        backgroundColor: bgColor
      }}
    >
      <div className="lds-roller z-[100]">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default FullLoading