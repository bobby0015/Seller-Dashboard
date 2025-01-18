import { authContext } from '@/context/authContext'
import React, { useContext } from 'react'

const Shop = () => {
  const {sellerInfo } = useContext(authContext);
  console.log(sellerInfo)
  return (
    <div>
      
    </div>
  )
}

export default Shop
