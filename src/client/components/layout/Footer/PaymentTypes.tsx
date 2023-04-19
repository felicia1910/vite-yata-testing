import React from 'react'
import Image from 'next/image'

const PaymentTypes: React.FC = () => {
  return (
    <div className='flex justify-center w-full lg:justify-end'>
      <div className='flex items-center justify-center h-16 mx-3 overflow-hidden lg:ml-6'>
        <Image
          src={`/homepage/footer/ae.svg`}
          className='object-cover w-12 h-12 transition duration-300 ease-in-out'
          alt={'AmericanExpress'}
          width={88}
          height={30}
        />
      </div>
      <div className='flex items-center justify-center h-16 mx-3 overflow-hidden lg:ml-6 '>
        <Image
          src={`/homepage/footer/mastercard.svg`}
          className='object-cover w-12 h-12 transition duration-300 ease-in-out'
          alt={'Mastercard'}
          width={60}
          height={48}
        />
      </div>
      <div className='flex items-center justify-center h-16 mx-3 overflow-hidden lg:ml-6'>
        <Image
          src={`/homepage/footer/unionpay.svg`}
          className='object-cover w-12 h-12 transition duration-300 ease-in-out'
          alt={'UnionPay'}
          width={94}
          height={40}
        />
      </div>
      <div className='flex items-center justify-center h-16 mx-3 overflow-hidden lg:ml-6'>
        <Image
          src={`/homepage/footer/visa.svg`}
          className='object-cover w-12 h-12 transition duration-300 ease-in-out'
          alt={'Visa'}
          width={84}
          height={24}
        />
      </div>
    </div>
  )
}

export default PaymentTypes