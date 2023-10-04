const Qualification = require('../models/qualificationModel');
const { qualificationValidator } = require('../validators/qualificationValidator');

exports.AddQualification = async (req, res) => {

    const { error } = qualificationValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;


    const qualificationData = req.body;

    try {

        const qualification = new Qualification({
            userId: _id,
            ...qualificationData
        });

        await qualification.save();
        res.status(200).json({ success: true, qualification });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetQualifications = async (req, res) => {

    const { _id } = req.user;

    try {

        const qualifications = await Qualification.find({ userId: _id })
            .populate('userId', 'firstName lastName designation')
            .exec();

       
        res.status(200).json({ success: true, qualifications });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetQualification = async (req, res) => {

    const { _id } = req.params;

    try {

        const qualification = await Qualification.findById(_id);

        if (!qualification) {
            return res
                .status(200)    
                .json({ success: false, message: "Qualification details not found." });
        }
        res.status(200).json({ success: true, qualification });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditQualification = async (req, res) => {

    const { error } = qualificationValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const qualificationId = req.params._id


    const qualificationData = req.body;

    try {

        const qualification = await Qualification
            .findOneAndUpdate(
                { _id: qualificationId, userId: _id },
                qualificationData,
                { new: true }
            )
            .populate('userId', 'firstName lastName designation')
            .exec();

        if (!qualification) {
            return res
                .status(404)
                .json({ success: false, message: "Qualification details not found." });
        }
        res.status(200).json({ success: true, message: "Qualification details updated successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.DeleteQualification = async (req, res) => {

    const { _id } = req.user;
    const qualificationId = req.params._id;

    try {

        const qualification = await Qualification.findOneAndDelete({ _id: qualificationId, userId: _id });

        if (!qualification) {
            return res
                .status(404)
                .json({ success: false, message: "Qualification details not found." });
        }
        res.status(200).json({ success: true, message: "Qualification details deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}