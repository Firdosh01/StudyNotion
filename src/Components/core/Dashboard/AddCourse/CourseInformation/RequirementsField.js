import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function RequirementsField({
    name,
    label,
    register,
    setValue,
    errors,
    getValues,
}) {

    const {editCourse, course} = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([])

    
  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }
  
  return (
    <div>
      <label htmlFor={name} className='text-sm text-richblack-5'>
        {label} <sup className='text-pink-200'>*</sup>
      </label>
      <div>
        <input 
        type="text"
        id={name}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
        />
        <button
        type='button'
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50'
        >
            Add
        </button>
        {requirementsList.length > 0 && (
            <ul>
                {requirementsList.map((requirement, index) => (
                    <li key={index} className='flex items-center text-richblack-5'>
                        <span>{requirement}</span>
                        <button
                        type='button'
                        className='ml-2 text-xs text-pure-greys-300'
                        onClick={() => handleRemoveRequirement(index)}
                        >
                            Clear
                        </button>
                    </li>
                ))}
            </ul>
        )}
        {errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label}
            </span>
        )}
      </div>
    </div>
  )
}
