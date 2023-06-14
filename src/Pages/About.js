import React from 'react'
import FoundingStory from '../assets/Images/FoundingStory.png'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import HighlightText from '../Components/core/HomePage/HighlightText'

function About() {
  return (
    <div>
      <section>
        <div className='text-center text-white'>
            <header>
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <p className='text-richblack-300 lg:w-[95%] text-center'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging 
            technologies, and nurturing a vibrant
             learning community.
            </p>
            </header>
            <div>
                <div>
                    <img src={BannerImage1} alt="BannerImage1" />
                    <img src={BannerImage2} alt="BannerImage1" />
                    <img src={BannerImage3} alt="BannerImage1" />
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default About
