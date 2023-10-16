const Profile = require('../models/profileModel');
const { profileValidator } = require('../validators/profileValidator');

exports.uploadProfileImage = async (req, res) => {
    var { _id } = req.user;
    const profileImage = req.fileUrls[0];
    try {
        const updatedProfileImage = await Profile
            .findByIdAndUpdate(
                _id,
                {
                    profileImage: profileImage
                },
                {
                    new: true,
                    upsert: true
                })
            .select("profileImage");

        if (!updatedProfileImage) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found." });
        }

        res.status(200).json({ success: true, updatedProfileImage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

exports.GetProfile = async (req, res) => {
    var { _id } = req.user;
    if (req.params._id) {
        _id = req.params._id;
    }
    try {
        const profile = await Profile.findById(_id).select("-_id -__v");
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found." });
        }
        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditProfile = async (req, res) => {


    const tmp = req.body;

    const {profileImage , ...profileData}=tmp;


    const { error } = profileValidator.validate(profileData);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    const _id = req.user;

    
    if (req.fileUrls && req.fileUrls.length > 0) {
        profileData.profileImage = req.fileUrls[0];
    }

    try {
        const profile = await Profile
            .findByIdAndUpdate(
                _id,
                profileData,
                {
                    new: true,
                    upsert: true
                })
            .select("name address designation joiningDate experience profileImage");

        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found" });
        }
        res.status(200).json({ success: true, message: "profile successfully updated", profile: profile });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

exports.DeleteProfile = async (req, res) => {

    const { _id } = req.user;
    try {
        const profile = await Profile.findByIdAndDelete(_id);
        if (!profile) {
            return res
                .status(404)
                .json({ success: false, message: "User profile not found." });
        }
        res.status(200).json({ success: true, message: "User profile deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}