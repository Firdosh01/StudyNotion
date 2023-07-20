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
      <div>
        <div>
            <img src={course.thumbnail} alt='course thumbnail' className={`${Hight} rounded-xl object-cover w-full`} />
        </div>
        <div>
            <p>{course?.courseName}</p>
            <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <p></p>
            <div>
                <span></span>
                <RatingStars Review_Count={avgReviewCount} />
                <span>{course?.ratingAndReviews?.length} Rating</span>
            </div>
            <p>{course?.price}</p>
        </div>
      </div>
      </Link>
    </div>
  )
}
