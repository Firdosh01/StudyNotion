import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
export default function Catalog() {

  const {catalogName} = useParams();
  const [catalogPageData,  setCatalogPageData] = useState(null)
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
          <div className="box-content px-4  bg-richblack-800">
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

      <div>
        {/* Section 1 */}
        <div>
          <div>
            <p></p>
            <p></p>
          </div>
          {/* CourseSlider */}
        </div>


      </div>
    {/* Footer */}
    </div>
  )
}
