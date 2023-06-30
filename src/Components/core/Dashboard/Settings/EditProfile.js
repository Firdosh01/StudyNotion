import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { updateProfile } from '../../../../services/operations/SettingsAPI'
import IconBtn from '../../../common/iconBtn'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

function EditProfile() {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const submitProfileForm = async (data) => {
        try{
            dispatch(updateProfile(token, data))
        }   
        catch(error) {
            console.log("ERROR MESSAGE - ", error.message)
        } 
    }

  return (
    <>
     <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className='flex flex-col my-10 rounded-md bg-richblack-800 gap-y-6 border-[1px] border-richblack-700 p-8 px-12'>
            <h2 className='text-lg font-semibold text-richblack-5'>
                Profile Information
            </h2>
            <div className='flex flex-col gap-5 lg:flex-row'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="firstName" className='lable-style text-richblack-5 text-sm'>
                        First Name
                    </label>
                    <input type="text"
                    name='firstName'
                    id='firstName'
                    placeholder='Enter first name'
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.58)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                    {...register("firstName", { require: true})}
                    defaultValue={user?.firstName} 
                    />
                    {errors.firstName && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please enter your first name.
                        </span>
                    )}
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="lastName" className='lable-style text-richblack-5 text-sm'>
                        Last Name
                    </label>
                    <input type="text"
                    name='lastName'
                    id='lastName'
                    placeholder='Enter last name'
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.58)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                    {...register("lastName", { require: true})}
                    defaultValue={user?.firstName} 
                    />
                    {errors.firstName && (
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please enter your last name.
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%] ">
              <label htmlFor="dateOfBirth" className="lable-style text-richblack-5 text-sm">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.58)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style text-richblack-5 text-sm">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.58)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style text-richblack-5 text-sm">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.58)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style text-richblack-5 text-sm">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.58)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
    </form> 
    </>
  )
}

export default EditProfile

