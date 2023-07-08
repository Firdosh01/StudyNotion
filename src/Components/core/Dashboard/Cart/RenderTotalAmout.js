import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/iconBtn';

export default function RenderTotalAmout() {

    const {total, cart} = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses)

        // API integrate -> payment geteway pending 
    }
  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>

      <IconBtn
      text="Buy Now"
      onclick={handleBuyCourse}
      coustomClasses= {"w-full justify-conter"}
       />
    </div>
  )
}
