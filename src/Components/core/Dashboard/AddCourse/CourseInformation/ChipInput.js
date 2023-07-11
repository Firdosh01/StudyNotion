import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md"

export default function ChipInput( {
    label,
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

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

    // Function to handle user input when chips are added
    const handleKeyDown = (event) => {
      // Check if user presses "Enter" or ","
      if (event.key === "Enter" || event.key === ",") {
        // Prevent the default behavior of the event
        event.preventDefault()
        // Get the input value and remove any leading/trailing spaces
        const chipValue = event.target.value.trim()
        // Check if the input value exists and is not already in the chips array
        if (chipValue && !chips.includes(chipValue)) {
          // Add the chip to the array and clear the input
          const newChips = [...chips, chipValue]
          setChips(newChips)
          event.target.value = ""
        }
      }
    }
  
    // Function to handle deletion of a chip
    const handleDeleteChip = (chipIndex) => {
      // Filter the chips array to remove the chip with the given index
      const newChips = chips.filter((_, index) => index !== chipIndex)
      setChips(newChips)
    }
  
  return (
    <div>
      <label htmlFor={name} className='text-sm text-richblack-5'>
        {label} <sup className='text-pink-200'>*</sup>
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
                onClick={() => handleDeleteChip(index)}
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
        onKeyDown={handleKeyDown}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
         />
      </div>
      {/* Render an error message if the input is required and not filled  */}
      {
        errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )
      }
    </div>
  )
}
