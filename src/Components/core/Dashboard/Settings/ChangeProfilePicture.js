import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/iconBtn'
import {updateDisplayPicture} from '../../../../services/operations/SettingsAPI'
import {FiUpload} from 'react-icons/fi'

function ChangeProfilePicture() {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()    
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file) {
         setImageFile(file)
         previewFile(file) 
        }
    }
    
    const previewFile = (file) => {
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onloadend = () => {
            setPreviewSource(render.result)
        }
    }

    const handleFileUpload = () => {
        try {
          console.log("uploading...")
          setLoading(true)
          const formData = new FormData()
          formData.append("displayPicture", imageFile)
          // console.log("formdata", formData)
          dispatch(updateDisplayPicture(token, formData)).then(() => {
            setLoading(false)
          })
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
      }
      
      useEffect(() => {
        if(imageFile) {
            previewFile(imageFile)
        }
      },[imageFile])
      
  return (
    <>
    <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
        <div className='flex gap-5'>
            <img 
            src={previewSource || user?.image}
            alt={`profile-${user?.firstname}`}
            className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className='space-y-2 '>
                <p>Change Profile Picture</p>
                <div className='flex flex-row gap-3'>
                    <input type="file"
                     ref={fileInputRef}
                     onChange={handleFileChange} 
                     accept='image/png, image/gif, image/jpeg'
                     className='hidden'
                     />
                     
                    <button
                    onClick={handleClick}
                    disabled={loading}
                    className="px-5 py-2 font-semibold rounded-md cursor-pointer bg-richblack-700 text-richblack-50"
                     >
                        Select
                     </button>
                     <IconBtn
                     text={loading ? "Uploading..." : "Upload"}
                     onclick={handleFileUpload}
                     >
                      {!loading && (
                        <FiUpload className="text-lg text-richblack-900" /> 
                      )}  
                     </IconBtn>
                </div>
            </div>
       </div>
    </div>
    </>
  )
}

export default ChangeProfilePicture
