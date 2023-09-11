const Guide = require('../models/guideModel');
const { guideValidator } = require('../validators/guideValidator');

exports.AddGuide = async (req, res) => {

    const { error } = guideValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;


    const guideData = req.body;

    try {

        const guide = await Guide({
            userId: _id,
            guideType: guideData.guideType,
            description: guideData.description,
            dissertationTitle: guideData.dissertationTitle,
            guidedYear: guideData.guidedYear,
            studentDetails: guideData.studentDetails
        });

        await guide.save();
        res.status(200).json({ success: true, guide });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetGuides = async (req, res) => {

    const { _id } = req.user;

    try {

        const guides = await Guide.find({ userId: _id })
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();;

        if (guides.length <= 0) {
            return res
                .status(404)
                .json({ success: false, message: "Guides details not found." });
        }
        res.status(200).json({ success: true, guides });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetGuide = async (req, res) => {

    const { _id } = req.params;

    try {

        const guide = await Guide.findById(_id)
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();;

        if (!guide) {
            return res
                .status(404)
                .json({ success: false, message: "Guide details not found." });
        }
        res.status(200).json({ success: true, guide });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditGuide = async (req, res) => {

    const { error } = guideValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const guideId = req.params._id


    const guideData = req.body;

    try {

        const guide = await Guide
            .findOneAndUpdate(
                { _id: guideId, userId: _id },
                guideData,
                { new: true }
            )
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        if (!guide) {
            return res
                .status(404)
                .json({ success: false, message: "Guide details not found." });
        }
        res.status(200).json({ success: true, message: "Guide details updated successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.DeleteGuide = async (req, res) => {

    const { _id } = req.user;
    const guideId = req.params._id;

    try {

        const guide = await Guide.findOneAndDelete({ _id: guideId, userId: _id });


        if (!guide) {
            return res
                .status(404)
                .json({ success: false, message: "Guide details not found." });
        }
        res.status(200).json({ success: true, message: "Guide details deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}