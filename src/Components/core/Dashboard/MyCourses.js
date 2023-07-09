import React, { useEffect, useState } from 'react'
import IconBtn from '../../common/iconBtn'
import { useNavigate } from 'react-router'
import {VscAdd} from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import {fetchInstructorCourses} from '../../../services/operations/courseDetailsAPI'
import CoursesTable from './InstructorCourses/CoursesTable'

export default function MyCourses() {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
       const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token)
        if(result) {
            setCourses(result)
        }
       }
       fetchCourses()
    }, [])
  return (
    <>
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl text-richblack-5'>My Courses</h1>
            <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course") }>
                <VscAdd />
            </IconBtn>
        </div>
        {courses &&  <CoursesTable courses={courses} setCourses={setCourses} />}
    </>
  )
}
