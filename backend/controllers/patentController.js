const Patent = require("../models/patentModel");
const { patentValidator } = require("../validators/patentValidator");

exports.AddPatent = async (req, res) => {
    const { error } = patentValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;

    const patentData = req.body;
    patentData.userId = _id;

    try {
        const patent = await Patent(patentData);

        const r = await patent.save();

        res.status(200).json({
            success: true,
            patent: r,
            message: "patent is added successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.GetPatents = async (req, res) => {
    const { _id } = req.user;

    try {
        const patents = await Patent.find({ userId: _id })
            .populate("userId", "firstName lastName designation")
            .exec();
        console.log("patent : ", patents);

        // if (patents.length <= 0) {
        //   return res
        //     .status(200)
        //     .json({ success: false, message: "Patents details not found." });
        // }

        res.status(200).json({ success: true, patents });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.GetPatent = async (req, res) => {
    const _id = req.params._id;
    console.log("getpatent _id", _id)
    try {
        const patent = await Patent.findById(_id)
            .populate("userId", "firstName lastName designation")
            .exec();

        if (!patent) {
            return res
                .status(200)
                .json({ success: false, message: "Patent details not found." });
        }
        const modifiedEvent = {
            ...patent._doc, // Copy other fields from the input object
            reports: patent._doc.reports.map((report) => {
                const { title, url } = report;
                return { title, url };
            }),
        };

        res.status(200).json({ success: true, patent: modifiedEvent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.EditPatent = async (req, res) => {
    const { error } = patentValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const patentId = req.params._id;

    const patentData = req.body;

    try {
        const patent = await Patent.findOneAndUpdate(
            { _id: patentId, userId: _id },
            patentData,
            { new: true }
        )
            .populate("userId", "firstName lastName designation")
            .exec();

        if (!patent) {
            return res
                .status(200)
                .json({ success: false, message: "Edit on invalid patent details" });
        }
        res.status(200).json({
            success: true,
            message: "Patent details updated successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

exports.DeletePatent = async (req, res) => {
    const { _id } = req.user;
    const patentId = req.params._id;

    try {
        const patent = await Patent.findOneAndDelete({
            _id: patentId,
            userId: _id,
        });

        if (!patent) {
            return res
                .status(200)
                .json({ success: false, message: "Patent details not found." });
        }

        res.status(200).json({
            success: true,
            message: "Patent details deleted successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};
