import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom'

function EnrolledCourses() {

    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate()

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            const filterPublishCourse = response.filter((ele) => ele.status !== "Draft")
            setEnrolledCourses(filterPublishCourse)
        }
        catch (error) {
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <>
            <div className='ml-12 text-3xl text-richblack-50 md:ml-0'>Enrolled Courses</div>
            {
                !enrolledCourses ?
                    (
                        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
                            <div className='spinner'></div>
                        </div>
                    ) :
                    !enrolledCourses.length ?
                        (
                            <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
                                You have not enrolled in any course yet
                            </p>
                        ) :
                        (
                            <div className='my-8 text-richblack-5'>
                                <div className='flex rounded-t-lg bg-richblack-500'>
                                    <p className='w-[45%] px-5 py-3'>Course Name</p>
                                    <p className='w-1/4 px-2 py-3'>Durations</p>
                                    <p className='flex-1 px-2 py-3'>Progress</p>
                                </div>
                                {
                                    enrolledCourses.map((course, i, arr) => (
                                        <div
                                            className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"} `}
                                            key={i}
                                        >
                                            <div
                                                className="flex md:flex-row flex-col w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                    )
                                                }}
                                            >
                                                <img
                                                    src={course.thumbnail}
                                                    alt="course_img"
                                                    className='md:h-14 md:w-14 w-[120px] rounded-lg object-cover'
                                                />
                                                <div className='flex flex-col max-w-xs gap-2'>
                                                    <p className='font-semibold'>{course.courseName}</p>
                                                    <p className="text-xs text-richblack-300">
                                                        {course.courseDescription.length > 50
                                                            ? `${course.courseDescription.slice(0, 50)}...`
                                                            : course.courseDescription}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='w-1/4 px-2 py-3'>
                                                {course?.totalDuration}
                                            </div>

                                            <div className='flex flex-col w-1/5 gap-2 px-2 py-3'>
                                                <p>Progress: {course.progressPercentage || 0}% </p>
                                                <ProgressBar
                                                    completed={course.progressPercentage || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }
        </>
    )
}

export default EnrolledCourses
