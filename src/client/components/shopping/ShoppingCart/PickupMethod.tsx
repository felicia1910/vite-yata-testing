import React from 'react'
import { selectIsEdited } from '../../../redux/control/slice';
import { useAppSelector } from '../../../redux/store';

const PickupMethod = () => {
    const isEdited = useAppSelector(selectIsEdited);
  return (
    <>
      {/* <Loading isLoading={addressList == null} /> */}
      <div className='relative pb-2 bg-white rounded-md'>
        <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
          <div className='py-2 ml-3 text-lg font-bold'>取貨方式</div>
        </div>
            <div className='relative flex flex-row py-2 mx-2 my-2 rounded-md bg-bar-green'>
              <div className='ml-3 text-lg font-semibold text-yata-deep'>
               店舖自取
              </div>
              <button
                className={
                  "absolute pt-1 text-sm underline right-2 underline-offset-1 transition-all ease-in-out duration-200 " +
                  (isEdited ? " pointer-events-none text-grey-i" : "text-yata")
                }
              >
                更改取貨方式
              </button>
            </div>

            <div className='mx-2 my-2 border rounded-md'>
                  <div className='my-3 ml-2'>請選擇店鋪</div>
<select className="w-full border-grey-i border rounded-md h-12 outline-none">
    <option>沙田店</option>
</select>
</div>
</div>
    </>
  
  )
}

export default PickupMethod