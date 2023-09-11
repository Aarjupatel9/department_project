const Achievement = require('../models/achievementModel');
const { achievementValidator } = require('../validators/achievementValidator');

exports.AddAchievement = async (req, res) => {

    const { error } = achievementValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;


    const achievementData = req.body;

    try {

        const achievement = await Achievement({
            userId: _id,
            achievementType: achievementData.achievementType,
            description: achievementData.description,
            achievedOn: achievementData.achievedOn
        });

        await achievement.save();
        res.status(200).json({ success: true, achievement });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetAchievements = async (req, res) => {

    const { _id } = req.user;

    try {

        const achievements = await Achievement.find({ userId: _id })
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        // const achievements = await Achievement.find({ userId: _id });

        if (achievements.length <= 0) {
            return res
                .status(404)
                .json({ success: false, message: "Achievements not found." });
        }
        res.status(200).json({ success: true, achievements });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetAchievement = async (req, res) => {

    const { _id } = req.params;

    try {

        // const achievement = await Achievement.findById(_id);
        const achievement = await Achievement.findById(_id)
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        if (!achievement) {
            return res
                .status(404)
                .json({ success: false, message: "Achievement not found." });
        }
        res.status(200).json({ success: true, achievement });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditAchievement = async (req, res) => {

    const { error } = achievementValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const achievementId = req.params._id


    const achievementData = req.body;

    try {

        // const achievement = await Achievement
        //     .findOneAndUpdate(
        //         { _id: achievementId, userId: _id },
        //         achievementData,
        //         {
        //             new: true
        //         })
        //     .select("userId achievementType description achievedOn");

        const achievement = await Achievement
            .findOneAndUpdate(
                { _id: achievementId, userId: _id },
                achievementData,
                { new: true }
            )
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .select("userId name designation achievementType description achievedOn")
            .exec();


        if (!achievement) {
            return res
                .status(404)
                .json({ success: false, message: "Achievement not found." });
        }
        res.status(200).json({ success: true, message: "Achievement updated successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.DeleteAchievement = async (req, res) => {

    const { _id } = req.user;
    const achievementId = req.params._id;

    try {

        const achievement = await Achievement.findOneAndDelete({ _id: achievementId, userId: _id });

        if (!achievement) {
            return res
                .status(404)
                .json({ success: false, message: "Achievement not found." });
        }
        res.status(200).json({ success: true, message: "Achievement deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}