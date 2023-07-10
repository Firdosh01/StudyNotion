import React from 'react'
import RenderSteps from './RenderSteps'

export default function AddCourse() {
  return (
    <>
     <div className='flex items-start w-full gap-x-6'>
        <div className='flex flex-col flex-1'>
            <h1 className='text-richblack-5'>Add Course</h1>
            <div>
                <RenderSteps />
            </div>
        </div>
        <div className='text-richblack-5'>
            <p>Code Upload Tips</p>
            <ul>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div> 
    </>
  )
}
