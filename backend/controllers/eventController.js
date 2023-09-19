const Event = require('../models/eventsModel');
const { eventValidator } = require('../validators/eventValidator');

exports.AddEvent = async (req, res) => {

    const { _id, ...eventData } = req.body;
    // console.log("eventData : ", eventData);

    const { error } = eventValidator.validate(eventData);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    const { _id: userId } = req.user;

    try {
        const event = await Event({ userId: userId, ...eventData });
        await event.save();
        res.status(200).json({ success: true, event: event, message: "event added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.GetEvents = async (req, res) => {
    const { _id } = req.user;

    try {

        const events = await Event.find({ userId: _id })
            .select("-__v")
            .populate('userId', 'firstName lastName designation')
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

        const event = await Event.findById(_id).select("-__v")
            .populate('userId', 'firstName lastName designation')
            .exec();

        const modifiedEvent = {
            ...event._doc, // Copy other fields from the input object
            reports: event._doc.reports.map((report) => {
                const { title, url } = report;
                // console.log({ title, url });
                return { title, url };
            }),
        };
        // console.log("event : ", modifiedEvent)

        if (!event) {
            return res
                .status(404)
                .json({ success: false, message: "Event not found." });
        }
        res.status(200).json({ success: true, event: modifiedEvent });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.EditEvent = async (req, res) => {

    const { _id, ...eventData } = req.body;
    const { error } = eventValidator.validate(eventData);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    const userId = req.user._id;

    // console.log(eventData);

    try {

        const event = await Event
            .findOneAndUpdate(
                { _id, userId: userId },
                eventData,
                { new: true }
            ).select("-__v")
            .populate('userId', 'firstName lastName designation')
            .exec();

        if (!event) {
            return res
                .status(404)
                .json({ success: false, message: "Event not found." });
        }
        res.status(200).json({ success: true, message: "Event details updated successfully.", event });

    } catch (error) {
        console.log("EditEvent error : ", error);
        res.status(500).json({ message: "Internal Server Error." });
    }

}

exports.DeleteEvent = async (req, res) => {

    try {
        const { _id } = req.user;

        const eventId = req.body._id;

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