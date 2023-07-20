import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../Components/core/Catalog/CourseSlider';
import CoursesCard from '../Components/core/Catalog/CoursesCard';
export default function Catalog() {

  const {catalogName} = useParams();
  const [catalogPageData,  setCatalogPageData] = useState(null)
  const [active, setActive] = useState(1)
  const [categoryId, setCategoryId] = useState("")

    //Fetch all categories
    useEffect(()=> {
      const getCategories = async() => {
          const res = await apiConnector("GET", categories.CATEGORIES_API);
          const category_id = 
          res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
          setCategoryId(category_id);
      }
      getCategories();
  },[catalogName]);

  useEffect(() => {
      const getCategoryDetails = async() => {
          try{
              const res = await getCatalogPageData(categoryId);
              console.log("PRinting res: ", res);
              setCatalogPageData(res);
          }
          catch(error) {
              console.log(error)
          }
      }
      if(categoryId) {
          getCategoryDetails();
      }
      
  },[categoryId]);
  
  return (
    <div className='text-white'>

          {/* Hero Section */}
          <div className="box-content px-4 bg-richblack-800">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>

          <div className="box-content w-full px-4 py-12 mx-auto max-w-maxContentTab lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="flex my-4 text-sm border-b border-b-richblack-600">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>

            <div>
              <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>
            
          </div>
          
          {/* Section 2 */}
          <div>
            <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </div>
            <div>
              <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <div>Freequently Bought</div>
            <div className='py-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2'>
                {
                  catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                  .map((course, index) => (
                    <CoursesCard course={course} key={index} Hight={"h-[400px]"} />
                  ))
                }
              </div>
            </div>
          </div>
          
    {/* Footer */}
    </div>
  )
}
