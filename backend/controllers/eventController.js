const Event = require('../models/eventModel');
const { eventValidator } = require('../validators/eventValidator');

exports.AddEvent = async (req, res) => {

    const { error } = eventValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;


    const eventData = req.body;

    try {

        const event = await Event({
            userId: _id,
            title: eventData.title,
            description: eventData.description,
            isOrganizedByBVM: eventData.isOrganizedByBVM,
            eventType: eventData.eventType,
            contributors: eventData.contributors,
            experts: eventData.experts,
            numberOfParticipants: eventData.numberOfParticipants,
            totalExpenses: eventData.totalExpenses,
            eventDate: {
                startDate: eventData.startDate,
                endDate: eventData.endDate,
            },
            organizedUnder: eventData.organizedUnder,
            address: eventData.isOrganizedByBVM ? null : {
                city: eventData.address.city,
                state: eventData.address.state,
                country: eventData.address.country,
                zip: eventData.address.zip,
            },
        });

        await event.save();
        res.status(200).json({ success: true, profile });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetEvents = async (req, res) => {

    const { _id } = req.user;

    try {

        const events = await Event.find({ userId: _id })
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        if (events.length <= 0) {
            return res
                .status(404)
                .json({ success: false, message: "Events not found." });
        }
        res.status(200).json({ success: true, events });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetEvent = async (req, res) => {

    const { _id } = req.params;

    try {

        const event = await Event.findById(_id)
            .populate({
                path: 'userId',
                populate: {
                    path: 'profiles',
                    select: 'name designation'
                }
            })
            .exec();

        if (!event) {
            return res
                .status(404)
                .json({ success: false, message: "Event not found." });
        }
        res.status(200).json({ success: true, event });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditEvent = async (req, res) => {

    const { error } = eventValidator.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, error: error.details[0].message });
    }

    const { _id } = req.user;
    const eventId = req.params._id


    const eventData = req.body;

    try {

        const event = await Event
            .findOneAndUpdate(
                { _id: eventId, userId: _id },
                eventData,
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

        if (!event) {
            return res
                .status(404)
                .json({ success: false, message: "Event not found." });
        }
        res.status(200).json({ success: true, message: "Event details updated successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.DeleteEvent = async (req, res) => {

    const { _id } = req.user;
    const eventId = req.params._id;

    try {

        const event = await Event.findOneAndDelete({ _id: eventId, userId: _id });

        if (!event) {
            return res
                .status(404)
                .json({ success: false, message: "Event not found." });
        }
        res.status(200).json({ success: true, message: "Event deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}