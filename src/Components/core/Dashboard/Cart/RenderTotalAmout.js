import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/iconBtn';
import { useNavigate } from 'react-router';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';

export default function RenderTotalAmout() {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {total, cart} = useSelector((state) => state.cart);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch)    
    }
  return (
    <div className='min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <p className='mb-1 text-sm font-medium text-richblack-300'>Total:</p>
      <p className='mb-6 text-3xl font-medium text-yellow-100'>Rs {total}</p>

      {/* <IconBtn
      text="Buy Now"
      onclick={handleBuyCourse}
      coustomClasses= {"w-full justify-conter"}
       /> */}

      <button onClick={handleBuyCourse} className="px-3 py-2 font-semibold rounded-md bg-yellow-50">
        Buy Now
      </button>
    </div>
  )
}
