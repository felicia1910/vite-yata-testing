import React from 'react'
import TickSvg from '../../public/common/tick'

type Props = {
  isChecked: boolean,
  onClick: () => void,
  label: string
}

const TickBox = ({ isChecked, onClick, label }: Props) => {
  return (
    <>
      <div
        className='border-[1px] mr-1 rounded w-5 h-5 p-[0.15rem] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'
        style={isChecked == true
          ? { borderColor: '#A6CE39', backgroundColor: '#A6CE39' }
          : { borderColor: '#6A3B0D', backgroundColor: '#FFF' }
        }
        onClick={onClick}
      >
        <TickSvg fill="#FFF" />
      </div>
      <label className="ml-2 text-lg">{label}</label>
    </>
  )
}

export default TickBox