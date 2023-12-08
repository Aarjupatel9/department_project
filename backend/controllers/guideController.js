const Guide = require("../models/guideModel");
const { guideValidator } = require("../validators/guideValidator");

exports.AddGuide = async (req, res) => {
    const { error } = guideValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;

    const guideData = req.body;
    guideData.userId = _id;

    try {
        const guide = await Guide(guideData);

        const r = await guide.save();

        res.status(200).json({
            success: true,
            guide: r,
            message: "guide is added successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.GetGuides = async (req, res) => {
    const { _id } = req.user;

    try {
        const guides = await Guide.find({ userId: _id })
            .populate("userId", "firstName lastName designation")
            .exec();
        console.log("guide : ", guides);

        // if (guides.length <= 0) {
        //   return res
        //     .status(200)
        //     .json({ success: false, message: "Guides details not found." });
        // }

        res.status(200).json({ success: true, guides });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.GetGuide = async (req, res) => {
    const _id = req.params._id;
    console.log("getguide _id", _id)
    try {
        const guide = await Guide.findById(_id)
            .populate("userId", "firstName lastName designation")
            .exec();

        if (!guide) {
            return res
                .status(200)
                .json({ success: false, message: "Guide details not found." });
        }
        const modifiedEvent = {
            ...guide._doc, // Copy other fields from the input object
            reports: guide._doc.reports.map((report) => {
                const { title, url } = report;
                return { title, url };
            }),
        };

        res.status(200).json({ success: true, guide: modifiedEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.EditGuide = async (req, res) => {
    const { error } = guideValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const guideId = req.params._id;

    const guideData = req.body;

    try {
        const guide = await Guide.findOneAndUpdate(
            { _id: guideId, userId: _id },
            guideData,
            { new: true }
        )
            .populate("userId", "firstName lastName designation")
            .exec();

        if (!guide) {
            return res
                .status(200)
                .json({ success: false, message: "Edit on invalid guide details" });
        }
        res.status(200).json({
            success: true,
            message: "Guide details updated successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.DeleteGuide = async (req, res) => {
    const { _id } = req.user;
    const guideId = req.params._id;

    try {
        const guide = await Guide.findOneAndDelete({
            _id: guideId,
            userId: _id,
        });

        if (!guide) {
            return res
                .status(200)
                .json({ success: false, message: "Guide details not found." });
        }

        res.status(200).json({
            success: true,
            message: "Guide details deleted successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};
