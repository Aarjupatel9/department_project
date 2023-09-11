const Publication = require('../models/publicationModel');
const { publicationValidator } = require('../validators/publicationValidator');

exports.AddPublication = async (req, res) => {

    const { error } = publicationValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;

    const publicationData = req.body;

    try {

        const publication = await Publication({

        });

        await publication.save();

        res.status(200).json({ success: true, publication });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetPublications = async (req, res) => {

    const { _id } = req.user;

    try {

        const publications = await Publication.find({ userId: _id })
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        if (!publications.length <= 0) {
            return res
                .status(404)
                .json({ success: false, message: "Publications details not found." });
        }
        res.status(200).json({ success: true, publications });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetPublication = async (req, res) => {

    const { _id } = req.params;

    try {

        const Publication = await Publication.findById(_id)
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "Publication details not found." });
        }
        res.status(200).json({ success: true, profile });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditPublication = async (req, res) => {

    const { error } = publicationValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const publicationId = req.params._id


    const publicationData = req.body;

    try {

        const publication = await Publication
            .findOneAndUpdate(
                { _id: publicationId, userId: _id },
                publicationData,
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

        if (!publication) {
            return res
                .status(404)
                .json({ success: false, message: "Publication details not found." });
        }
        res.status(200).json({ success: true, message: "Publication details updated successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.DeletePublication = async (req, res) => {

    const { _id } = req.user;
    const publicationId = req.params._id


    try {

        const publication = await Publication.findOneAndDelete({ _id: publicationId, userId: _id });

        if (!publication) {
            return res
                .status(404)
                .json({ success: false, message: "Publication details not found." });
        }

        res.status(200).json({ success: true, message: "Publication details deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}