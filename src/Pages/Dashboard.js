import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router';

function Dashboard() {

    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {loading: profileLoading} = useSelector( (state) => state.profile);

    if(profileLoading || authLoading) {
      return (
        <div className='mt-10'>
          Loading...
        </div>
      )
    }
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-400'>
      <Sidebar />
      <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
        <div className='w-11/12 py-10 mx-auto max-w-[1000px] '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
