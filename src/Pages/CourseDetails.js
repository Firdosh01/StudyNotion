import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { formatDate } from '../services/formatDate'
import RatingStars from '../Components/common/RatingStars'
import GetAvgRating from '../utils/avgRating'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import Footer from '../Components/common/Footer'
import Error from './Error'
import ConfirmationModal from '../Components/common/ConfirmationModal'
import CourseAccordionBar from '../Components/core/Course/CourseAccordionBar'
import CourseDetailsCard from '../Components/core/Course/CourseDetailsCard'

export default function CourseDetails() {

  const { loading } = useSelector((state) => state.profile)

  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()

  // Declear a state to save the course details 
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        // console.log("course details res: ", res)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  // Total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if(!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails


  const handleBuyCourse = () => {
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }



  return (
    <>
      <div className="relative w-full bg-richblack-800">
        <div className='box-content px-4 mx-auto lg:w-[1260px] 2xl:relative'>
          <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">'>
            <div className='relative block'>
              <div className='absolute bottom-0 left-0 w-full h-full shadow-[#161D29_0px_-64px_36px_-28px_inset] '></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className='w-full aspect-auto'
              />
            </div>
            <div className='z-30 flex flex-col justify-center gap-4 py-5 my-5 text-lg text-richblack-5'>
              <div>
                <p className='text-4xl font-bold text-richblack-5'>
                  {courseName}
                </p>
              </div>
              <p className='text-richblack-200'>
                {courseDescription}
              </p>
              <div className='flex flex-wrap items-start gap-2 text-md'>
                <span className='text-yellow-5'>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p>
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className='flex flex-wrap gap-5 text-lg'>
                <p className='flex items-center gap-2'>
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className='flex items-center gap-2'>
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className='flex flex-col w-full gap-4 py-4 border-y border-y-richblack-500 lg:hidden'>
              <p className='pb-4 space-x-3 text-3xl font-semibold text-richblack-5'>
                Rs. {price}
              </p>
              <button className='yellowButton'>
                Buy Now
              </button>
              <button className='blackButton'>
                Add to cart
              </button>
            </div>
          </div>
          {/* CourseDetails Card  */}
          <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block'>
            <CourseDetailsCard
            course={response?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse} 
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          {/* What will you learn section  */}
          <div className='p-8 my-8 border border-richblack-600'>
            <p className='text-3xl font-semibold'>
              What you'll learn
            </p>
            <div className='mt-5'>
              <p>{whatYouWillLearn}</p>
            </div>
          </div>

          {/* Course Content section  */}

          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="py-4 mb-12">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="object-cover rounded-full h-14 w-14"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
