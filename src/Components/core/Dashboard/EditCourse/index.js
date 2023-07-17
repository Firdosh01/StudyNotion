import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slice/courseSlice'
import RenderSteps from '../AddCourse/RenderSteps'

export default function EditCourse() {

    const { courseId } = useParams()
    const dispatch = useDispatch()
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        })()
    }, [])

    if(loading) {
        return (
            <div className='grid flex-1 place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
  return (
    <div>
      <h1 className='text-3xl font-medium mb-14 text-richblack-5'>
          Edit Course
     </h1>
     <div className='mx-auto max-w-[600px]'>
        {course ? (
            <RenderSteps />
        ) : (
         <p className='text-3xl font-medium text-center mt-14 text-richblack-100'>
            Course not found
         </p>   
         )
        }
     </div>
    </div>
  )
}
