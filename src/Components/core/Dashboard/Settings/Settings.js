import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <>
    <h1 className='text-3xl font-medium mb-14 text-richblack-5'>
        Edit Profile
    </h1>
    {/* Change Profile Picture  */}
    <ChangeProfilePicture />

    {/* Delete Account  */}
    <DeleteAccount />
    </>
  )
}

export default Settings
