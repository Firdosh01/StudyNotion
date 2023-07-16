const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {

		// Extract the required properties from the request body
        const { sectionName, courseId } = req.body;

        // Validation the input 
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required properties"
            })
        }
        // create section 
        const newSection = await Section.create({ sectionName });

       		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});

    }
    catch (error) {
         res.status(500).json({
            success: false,
			message: "Internal server error",
            error: error.message,
        });
    }
}
// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		const course = await Course.findById(courseId)
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
		res.status(200).json({
			success: true,
			data: course,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// Delete a Section 
exports.deleteSection = async (req, res) => {
    try {

        const { sectionId, courseId } = req.params;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
			  courseContent: sectionId,
			},
		  })
		  const section = await Section.findById(sectionId)
		  console.log(sectionId, courseId)
		  if (!section) {
			return res.status(404).json({
			  success: false,
			  message: "Section not found",
			})
		  }
		  // Delete the associated subsections
		  await SubSection.deleteMany({ _id: { $in: section.subSection } })
	  
		  await Section.findByIdAndDelete(sectionId)
	  
		  // find the updated course and return it
		  const course = await Course.findById(courseId)
			.populate({
			  path: "courseContent",
			  populate: {
				path: "subSection",
			  },
			})
			.exec()

		res.status(200).json({
			success: true,
			message: "Section deleted  ",
		});

    }
    catch(error) {
        res.status(500).json({
			success: false,
            message: "Internal server error",
		});
    }
}