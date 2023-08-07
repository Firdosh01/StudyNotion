import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import {Link} from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';

export default function CoursesCard({course, Hight}) {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count)
    },[course])

  return (
    <div>
      <Link to={`/courses/${course._id}`}>
      <div className='mr-6'>
        <div className='rounded-lg'>
            <img src={course.thumbnail} alt='course thumbnail' className={`${Hight} rounded-xl object-cover w-full`} />
        </div>
        <div className='flex flex-col gap-2 px-1 py-3'>
            <p className='text-xl text-richblack-5'>{course?.courseName}</p>
            <p className='text-sm ring-richblack-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex items-center gap-2'>
                <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Rating</span>
            </div>
            <p className='text-xl text-richblack-5'>{course?.price}</p>
        </div>
      </div>
      </Link>
    </div>
  )
}
