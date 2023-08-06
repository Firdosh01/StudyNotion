import React, { useEffect, useState } from 'react'
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import IconBtn from '../../../../common/iconBtn'
import Upload from '../CourseInformation/Upload'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from '../../../../../slice/courseSlice'
import {
     createSubSection,
     updateSubSection 
} from '../../../../../services/operations/courseDetailsAPI'


export default function SubSectionModal({
    modalData,
    setModalData,
    view = false,
    add = false,
    edit = false,
}) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm()

    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const dispatch = useDispatch()

    useEffect(() => {
        setValue("lectureTitle", modalData.title)
        setValue("lectureDesc", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
    }, [])

    // detect whether form is updated or not 
    const isFormUpdated = () => {
        const currentValues = getValues()

        if(
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.video
        ) {
            return true
        }
        return false
    }

    const handleEditSubsection = async () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        const formData = new FormData()
        // console.log("Values After Editing form values:", currentValues)
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
          formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
          formData.append("video", currentValues.lectureVideo)
        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {
          // console.log("result", result)
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData.sectionId ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
      }
      
       const onSubmit = async (data) => {
        if(view) return 
        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No changes made to the form")
            } else {
                handleEditSubsection()
            }
            return
        }
        
        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true)
        const result = await createSubSection(formData, token)
        if (result) {
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? result : section
          )
          const updatedCourse = { ...course, courseContent: updatedCourseContent }
          dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
      }
    
    
    
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm h-screen w-screen'>
            <div className='my-8 w-11/12 max-w-[670px] bg-richblack-800 border border-richblack-400 rounded-lg'>
                <div className='flex justify-between p-5 rounded-t-lg bg-richblack-700'>
                    <p className='text-xl font-semibold text-richblack-5'>
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button
                        onClick={() => (!loading ? setModalData(null) : {})} >
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal Form  */}
                <form
                    onClick={handleSubmit(onSubmit)}
                    className='px-8 py-10 space-y-8'
                >
                    {/* Lecture Video Upload */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* Lecture Title   */}
                    <div>
                        <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
                            Lecture Title {!view && <sup className='text-pink-200'>*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", { required: true })}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none"
                        />
                        {errors.lectureTitle && (
                            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                                Lecture title is required
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
                            Lecture Description {" "}
                            {!view && <sup className='text-pink-200'>*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none min-h-[130px]  resize-x-none"
                        />
                        {errors.lectureDesc && (
                            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                                Lecture Description is required
                            </span>
                        )}
                    </div>
                    {!view && (
                        <div className='flex justify-end'>
                            <IconBtn
                                disabled={loading}
                                text={loading ? "loading..." : edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
