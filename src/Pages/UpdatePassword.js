import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"


function UpdatePassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { loading } = useSelector((state) => state.auth)
    
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const {password, confirmPassword} = formData
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit= (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }


    return (
        <div>
            {
                loading ?
                    (
                        <div className="spinner"></div>
                    ) :
                    (
                        <div>
                            <h1>
                                Choice new password
                            </h1>
                            <p>Almost done. Enter your new password and youre all set.</p>
                            <form onSubmit={handleOnSubmit}>
                                <label>
                                    <p>New Password <sup>*</sup></p>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder='Enter Password'
                                        className='w-full pr-10 form-style'
                                    />
                                    <span onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) :
                                            (
                                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                            )}
                                    </span>
                                </label>

                                 <label>
                                    <p>Confirm New Password <sup>*</sup></p>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder='Enter Password'
                                        className='w-full pr-10 form-style'
                                    />
                                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    >
                                        {showConfirmPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) :
                                            (
                                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                            )}
                                    </span>
                                </label>


                                <button type='submit'>
                                    Reset Password
                                </button>

                                <div>
                                    <Link to="/login">
                                        <p className="flex items-center gap-x-2 text-richblack-5">
                                            <BiArrowBack /> Back To Login
                                        </p>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}

export default UpdatePassword
