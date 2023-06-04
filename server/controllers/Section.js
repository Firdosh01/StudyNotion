const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {

        // data fetch 
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

        // Return the updated course object in the response
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        });
    }
}
//  Update Section 
exports.updatedSection = async (req, res) => {
    try{

        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message: "Missing properties",
            })
        }

        const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

        return res.status(200).json({
            success:true,
            message: "Section updated successfully ",
        });
    }
    catch(error) {
       return res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again",
            error: error.message,
        });

    }
}
// Delete Section 
exports.deleteSection = async (req, res) => {
    try {

        const { sectionId } = req.params;
		await Section.findByIdAndDelete(sectionId);

		res.status(200).json({
			success: true,
			message: "Section deleted successfully ",
		});

    }
    catch(error) {
       return res.status(500).json({
			success: false,
            message: "Unable to delete Section, please try again",
		});
    }
}