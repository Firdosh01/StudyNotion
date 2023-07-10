import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import { MdNavigateNext } from "react-icons/md"
import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseCategories,
  } from "../../../../../services/operations/courseDetailsAPI"
import { setStep } from '../../../../../slice/courseSlice'
import IconBtn from "../../../../common/iconBtn"
import ChipInput from './ChipInput'


export default function CourseInformationForm() {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors},
    } = useForm()

    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.auth)
    const {course, editCourse} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])


    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            if(categories.lenth > 0) {
                setCourseCategories(categories)
            }
            setLoading(false)
        }

        if (editCourse) {
            // console.log("data populated", editCourse)
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
          }
          getCategories()
    }, [])

  return (
    <>
     <form
     onSubmit={handleSubmit()}
     className='space-y-8 border-[1px] rounded-md border-richblack-700 bg-richblack-800 p-6'
     >
        {/* Course Title  */}
        <div>
            <label htmlFor="courseTitle">
                Course Title <sup className='text-pink-200'>*</sup>
            </label>
            <input id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", {required: true})}
             className='w-full'
             />
             {errors.courseTitle && (
                <span className='text-pink-200'>Course title is required</span>
             )}
        </div>

        {/* Course Title  */}
        <div>
            <label htmlFor="courseShortDesc">
                Course Short Description <sup className='text-pink-200'>*</sup>
            </label>
            <textarea 
            id='courseShortDesc'
            placeholder='Enter Description'
            {...register("courseShortDesc", { required: true} )}
            className='w-full' 
            />
            {
                errors.courseShortDesc && (
                    <span className='text-pink-200'>
                        Course Description is required
                    </span>
                )
            }
        </div>

        {/* Course Price  */}
        <div>
            <label htmlFor="coursePrice">
                Course Price <sup className='text-pink-200'>*</sup>
            </label>
            <div>
               <input id='coursePrice'
            placeholder='Enter Course price'
            {...register("courseprice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                     value: /^(0|[1-9]\d*)(\.\d+)?$/,
                }})}
             className='w-full'
             />
              <HiOutlineCurrencyRupee className="absolute inline-block text-2xl -translate-y-1/2 left-3 top-1/2 text-richblack-400" />
             </div>
             {errors.coursePrice && (
                <span className='text-pink-200'>
                    Course Price is required
                </span>
             )}
            </div>
            {/* Course Category  */}
            <div>
                <label htmlFor="courseCategory">
                    Course Category <sup className='text-pink-200'>*</sup>
                </label>
                <select
                {...register("courseCategory", { required: true} )}
                defaultValue=""
                id='courseCategory'
                className='w-full'
                >
                <option value="" disabled>
                    Choice a Category
                </option>
                {
                    !loading && 
                    courseCategories?.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }   
                </select>
              {errors.courseCategory && (
               <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Course Category is required
              </span>
             )}
            </div>
            {/* Course Tags  */}
            <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
             />
             {/* Course Thumnail Image  */}
             
             {/* <Upload 
             name="courseImage"
             label="course Thumnail"
             register={register}
             setValue={setValue}
             error={errors}
             editData={editCourse ? course?.thumbnail : null}
             /> */}

             {/* Benefits of the course  */}
             <div>
                <label htmlFor="courseBenefits">
                    Benefits of the course <sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                id='courseBenefits'
                placeholder='Enter benefits of the course'
                {...register("courseBenefits", { required: true })} 
                className='w-full'
                />
                {errors.courseBenefits && (
                    <span className='text-pink-200'>
                        Benefits of the course is required
                    </span>
                )}
             </div>
             
             {/* <RequirementsField
             name="courseRequirements"
             label="Requirements/Instructions"
             register={register}
             setValue={setValue}
             errors={errors}
             getValues={getValues}
             /> */}

             {/* Next Button  */}
             <div>
                {editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    disabled={loading}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}                    
                    >
                        Continue without Saving
                    </button>
                )}
                <IconBtn
                disabled={loading}
                text={!editCourse ? "Next" : "Saving Changes"}
                >
                <MdNavigateNext />    
                </IconBtn>
             </div>
    </form> 
    </>
  )
}

