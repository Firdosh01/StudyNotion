import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from '../../common/HighlightText'
import CTAButton from "../../common/Button"
import { FaArrowRight } from 'react-icons/fa'

function InstructorSection() {
  return (
    <div className="mt-16">
      <div className="flex flex-col-reverse items-center gap-20 md:flex-row">
        <div className="lg:w-[50%] w-[90%]">
          <img
            src={Instructor}
            alt=""
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>

        <div className="lg:w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold lg:w-[50%]">
            Become an
            <HighlightText text={"Instructor"} />
          </div>

          <p className="font-medium text-[16px] lg:w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            Coursenexus. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection
