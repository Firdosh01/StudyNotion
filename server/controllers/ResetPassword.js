const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {

        //get Email from request body
        const email = req.body.email;
        // check user for this email, email validation
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: 'Your Email is not ragistered with us'
            });
        }
        // generate token
        const token = crypto.randomUUID();
        //update user by adding token and exprition time

        const updatedDetails = await User.findOneAndUpdate(

            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        // create url
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing the url
        await mailSender(email,
            "Password Reset Link",
            `Password Reset Link ${url}`
        );

        //return response

        return res.json({
            success: true,
            message: 'Email sent successfully, please check email and change pwd'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: 'Something went wrong while sending reset pwd mail'
        })
    }
}


//resetPassword


exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};