import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Th, Thead, Tr, Td, Tbody} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { useNavigate } from 'react-router'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { formatDate } from "../../../../services/formatDate"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import ConfirmationModal from '../../../common/ConfirmationModal'

export default function CoursesTable( {courses, setCourses} ) {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }
  return (
    <>
    <Table className="w-full mt-10 border rounded-xl border-richblack-800 ">
      <Thead>
        <Tr className="flex px-6 py-2 border-b rounded-t-md gap-x-10 border-b-richblack-800">
          <Th className="flex-1 text-sm font-medium text-left uppercase text-richblack-100">
            Courses
          </Th>
            <Th className="text-sm font-medium text-left uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-sm font-medium text-left uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-sm font-medium text-left uppercase text-richblack-100">
              Actions
            </Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses?.length === 0 ? (
          <Tr>
            <Td className="py-10 text-2xl font-medium text-center text-richblack-100">
              No courses found
            </Td>
          </Tr>
         ) :
         (
          courses?.map((course) => (
            <Tr key={course._id}
            className="flex px-6 py-8 border-b gap-x-10 border-richblack-800"
            >
              <Td>
                <img src={course?.thumbnail}
                alt={course?.courseName}
                className="h-[148px] w-[220px] rounded-lg object-cover"
                />
                <div className='flex flex-col justify-between'>
                  <p className='text-lg font-semibold text-richblack-5'>
                    {course.courseName}
                  </p> 
                  <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className='flex flex-row items-center gap-2 rounded-full w-fit bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100'>
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <div className="flex items-center justify-center w-3 h-3 bg-yellow-100 rounded-full text-richblack-700">
                        <FaCheck size={8} />
                      </div>
                      Published
                    </p>
                    )}                
                </div>
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                2h 30min
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                {course.price}
              </Td>
              <Td className="text-sm font-medium text-richblack-100">
                
                <button
                disabled={loading}
                onClick={() => {
                  navigate(`/dashboard/edit-course/${course._id}`)
                }}
                title='Edit'
                className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300'
                >
                    <FiEdit2 size={20} /> 
                </button>
                
                <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
              </Td>
            </Tr>
          ))
         )}
      </Tbody>
    </Table>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    
    </>
  )
}
