import React from 'react'
import { toast } from 'react-hot-toast'
import copy from "copy-to-clipboard"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { addToCart } from '../../../slice/cartSlice'
import { ACCOUNT_TYPE } from "../../../utils/constants"


export default function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: course_id,
  } = course

  const handleShare = () => {
   copy(window.location.href)
    toast.success("Link copied to clipboard")
 
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <>
      <div className='flex flex-col gap-4 p-4 rounded-md bg-richblack-700 text-richblack-5'>
        {/* Course Image  */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
        />

        <div className='px-4'>
          <div className='pb-4 space-x-3 text-3xl font-semibold'>
            Rs. {CurrentPrice}
          </div>
          <div className='flex flex-col gap-4'>
            <button
              className="px-3 py-2 rounded-md yellowButton bg-yellow-50 text-richblack-900"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              { user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course" : "Buy Now" }
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="px-3 py-2 rounded-md blackButton bg-yellow-50 text-richblack-900">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className='pt-6 pb-3 text-sm text-center text-richblack-25'>
              30-Day Money-Back Guarantee
            </p>
          </div>
          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="flex items-center gap-2 py-6 mx-auto text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
