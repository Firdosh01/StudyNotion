import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"


const timeline = [
    {
        id: 1,
        logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        id: 2,
        logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        id: 3,
        logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        id: 4,
        logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },


]

function TimelineSection() {
    return (
        <div>
            <div className="flex flex-col items-center gap-20 mb-20 lg:flex-row">
                <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {timeline.map((ele, i) => {
                        return (
                            <div className="flex flex-col lg:gap-3" key={i}>
                                <div className="flex gap-6" key={i}>
                                    <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                        <img src={ele.logo} alt="" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{ele.heading}</h2>
                                        <p className="text-base">{ele.Description}</p>
                                    </div>
                                </div>
                                <div
                                    className={`hidden ${timeline.length - 1 === i ? "hidden" : "lg:block"
                                        }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                                ></div>
                            </div>
                        );
                    })}
                </div>
                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                        {/* Section 1 */}
                        <div className="flex items-center gap-5 lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                            <h1 className="text-3xl font-bold w-[75px]">10</h1>
                            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                Years experiences
                            </h1>
                        </div>

                        {/* Section 2 */}
                        <div className="flex items-center gap-5 lg:px-14 px-7">
                            <h1 className="text-3xl font-bold w-[75px]">250</h1>
                            <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                types of courses
                            </h1>
                        </div>
                        <div></div>
                    </div>
                    <img
                        src={timelineImage}
                        alt="timelineImage"
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
                    />
                </div>
            </div>
        </div>
    )
}

export default TimelineSection
