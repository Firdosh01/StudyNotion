import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createRating } from '../../../../services/operations/courseDetailsAPI'
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"

export default function CourseReviewModal({setReviewModal}) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm()

    useEffect(() => {
        setValue("courseExprience", "")
        setValue("courseRating", 0)
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }
    
    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        )
        setReviewModal(false)
    }
  return (
    <>
      <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 my-10 max-w-[700px] rouneded-lg border-richblack-400 border bg-richblack-800'>
            {/* Modal Header  */}
            <div className='flex items-center justify-between p-5 rounded-t-lg bg-richblack-700'>
                <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
                <button onClick={() => setReviewModal(false)}>
                 <RxCross2 className="text-2xl text-richblack-5" />   
                </button>
            </div>
            {/* Modal Body  */}
            <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center mt-6"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex flex-col w-11/12 space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style text-richblack-100 bg-richblack-700 rounded-md px-2 py-2 resize-x-none min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="flex justify-end w-11/12 mt-6 gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
               <button className="px-4 py-1 font-semibold rounded-md bg-yellow-50">
                Save
               </button>
            </div>
          </form>
         </div>
        
        </div>
      </div>
    </>
  )
}
