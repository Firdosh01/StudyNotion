import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slice/viewCourseSlice'
import VideoDetailsSidebar from '../Components/core/Dashboard/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../Components/core/Dashboard/ViewCourse/CourseReviewModal'

export default function ViewCourse() {

    const {courseId} = useParams()
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [reviewModal, setReviewModal] = useState(false)

    useEffect(() => {
        ;(async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token)
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length
         })
            dispatch(setTotalNoOfLectures(lectures))
         })()
    }, [])
  return (
    <>
     <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className='flex-1 overflow-auto h-[calc(100vh-3.5rem)]'>
            <div className='mx-6'>
                <Outlet />
            </div>
        </div>
    </div> 
    {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
