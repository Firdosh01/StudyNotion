import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {Table, Th, Thead, Tr, Td, Tbody} from 'react-super-responsive-table'

export default function CoursesTable( {courses, setcourses} ) {  
  return (
    <>
    <Table>
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
                />
              </Td>
              
            </Tr>
          ))
         )}
      </Tbody>
    </Table>
    </>
  )
}
