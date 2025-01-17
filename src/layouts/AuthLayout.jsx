import useTokenStore from '@/store';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const token = useTokenStore((state) => state.token);

    if (token) {
        return <Navigate to={'/dashboard'} replace />;
    }

  return (
    <>
      <Outlet/>
    </>
  )
}

export default AuthLayout
