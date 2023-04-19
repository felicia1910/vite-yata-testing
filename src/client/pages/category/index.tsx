import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading';

const Category = () => {
  const router = useNavigate()

  useEffect(() => {
    router('/')
  }, [router])

  return (
    <div className='h-auto'>
      <Loading isLoading={true} height={'80vh'} />
    </div>
  )
}

export default Category