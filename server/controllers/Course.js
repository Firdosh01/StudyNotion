const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {

        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        // validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor  Details: ",instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        //check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails) {
            return res.status(404).json({
                success: false,
                message: 'Tag Details not found',
            });
        }

        //upload Image top Cloudinary
        const thumbnailImage = await uploadImageToCloudinary (thumbnail, process.env.FOLDER_NAME);

        // Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			thumbnail: thumbnailImage.secure_url,
		});

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

        // update the Tag schema 

        // return response 
        res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});


    }
    catch (error) {

        console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});

    }
}

// getAllCourses handler function 

exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
    }
    catch(error) {
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});

    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
	try{
		//get id
		const {courseId} = res.body
		//find course details
		const courseDetail = await Course.find(
			{_id:courseId})
			.populate(
				{
					path:"instructor",
					populate:{
						path:"additionalDetails",
					},
				}
		)
		.populate("category")
		//.populate("ratingAndreviews")
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		//validation
		if(!courseDetail){
			return res.status(400).json({
				success: true,
				message:`Could not find the course with ${courseId}`,
			});
		}

		//return response
		return res.status(200).json({
			success:true,
			message: "Course Details fetched successfully",
			data: courseDetail,
		})
	}
	catch(error) {

		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}