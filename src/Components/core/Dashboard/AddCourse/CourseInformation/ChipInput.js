import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

export default function ChipInput( {
    lable,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) {

   const {editCourse, course} = useSelector((state) => state.course)
   
     // Setting up state for managing chips array
  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      // console.log(course)
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      <label htmlFor={name}>
        {lable} <sup className='text-pink-200'>*</sup>
      </label>
      <div>
        {chips.map((chip, index) => (
            <div
            key={index}
             className='flex items-center px-2 py-1 m-1 text-sm bg-yellow-400 rounded-full text-richblack-5'>
                {/* Render the chip value   */}
                {chip}
                {/* Render the button to delete the chip */}
                <button
                type='button'
                className='ml-2'
                // onClick={}
                >
                   <MdClose className="text-sm" /> 
                </button>
            </div>
        ))}
        {/* Render the input for adding new chips  */}
        <input
        id={name}
        name={name} 
        type="text"
        placeholder={placeholder}
        // onKeyDown={}
        className='w-full' />
      </div>
      {/* Render an error message if the input is required and not filled  */}
      {
        errors[name] && (
            <span className='text-pink-200'>
                {lable} is required
            </span>
        )
      }
    </div>
  )
}
