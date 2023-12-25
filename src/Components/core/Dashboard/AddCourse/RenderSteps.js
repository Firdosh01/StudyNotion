import React, { lazy } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
const CourseInformationForm = lazy(() => import("./CourseInformation/CourseInformationForm"))
const CourseBuilderForm = lazy(() => import("./CourseBuilderForm/CourseBuilderForm"))
const PublishCourse = lazy(() => import("./PublishCourse"))


export default function RenderSteps() {

    const {step} = useSelector((state) => state.course)
    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish", 
        },
    ]
  return (
    <>
      <div >
        <div className='relative flex justify-center w-full mb-2'>
            {
                steps.map((item) => (
                    <>
                    <div className="flex flex-col items-center "
                    key={item.id}>
                        
                       <button 
                       className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] 
                       ${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"} 
                        ${step > item.id && "bg-yellow-50 text-yellow-50"}`}>
                            {
                                step > item.id ? (<FaCheck className='font-bold text-richblack-900' />) 
                                : (item.id)
                            }
                        </button>
                    </div>
                    {
                       item.id !== steps.length && (
                      <>
                     <div
                    className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                    step > item.id  ? "border-yellow-50" : "border-richblack-500"
                    } `}> </div>
                     </>
               )}
            </>
            ))
           }
        </div>
        
        <div className='relative flex justify-between w-full mb-16 select-none'>
            {
                steps.map((item) => (
                    <>
                    <div className='flex min-w-[130px] flex-col items-center gap-y-2' 
                    key={item.id}>
                        <p 
                        className={`text-sm ${
                        step >= item.id ? "text-richblack-5" : "text-richblack-500"
                       }`}
                        >
                            {item.title}
                        </p>
                    </div>
                    </>
                ))
            }
        </div>
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
