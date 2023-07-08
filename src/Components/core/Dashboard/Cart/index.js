import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmout from './RenderTotalAmout'

export default function Cart() {

    const {total, totalItems} = useSelector((state) => state.auth)

  return (
    <>
      <h1 className='text-3xl font-medium mb-14 text-richblack-5'>Your Cart</h1>
      <p className='className="pb-2 font-semibold border-b border-b-richblack-400 text-richblack-400'>
        {totalItems}
      </p>

      {total > 0 ?
      (
        <div className='flex flex-col-reverse items-start mt-8 gap-x-10 gap-y-6 lg:flex-row'>
            <RenderCartCourses />
            <RenderTotalAmout />
        </div>
      ) 
      :
      (
        <p className='text-3xl text-center mt-14 text-richblack-100'>
            Your Cart is Empty
        </p>
      )
    }
    </>
  )
}
