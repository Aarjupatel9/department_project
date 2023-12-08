const { dataTypeModelMap, getMetadataOfDataType, dateFieldMap } = require("../utils/dataFilter");

exports.DataFilter = async (req, res) => {

    try {
        const { userId, dataType, startDate, endDate, sortBy, limit, skip, ...dynamicFilters } = req.query;

        if (!dataTypeModelMap[dataType]) {
            return res.status(400).json({ success: false, error: "Invalid dataType" });
        }

        let filter = {};

        if (userId) {
            filter = { userId };
        }

        if (startDate || endDate) {

            let dateFilter = {};

            if (dateFieldMap[dataType] === 'completionYear' || dateFieldMap[dataType] === 'guidedYear') {
                if (startDate)
                    dateFilter.$gte = parseInt(startDate, 10)

                if (endDate)
                    dateFilter.$lte = parseInt(endDate, 10)

            }
            else {
                if (startDate)
                    dateFilter.$gte = new Date(startDate)
                if (endDate)
                    dateFilter.$lte = new Date(endDate)
            }

            filter[dateFieldMap[dataType]] = dateFilter

        }

        for (const [key, value] of Object.entries(dynamicFilters)) {
            if (Object.keys(dataTypeModelMap[dataType].schema.obj).includes(key)) {
                filter[key] = value;
            }
        }

        let sortOption = { createdAt: "desc" };

        if (sortBy) {
            const sortByFields = sortBy.split(',');

            sortOption = sortByFields.reduce((acc, field) => {
                acc[field] = 'asc';
                return acc;
            }, {});
        }

        const query = dataTypeModelMap[dataType].find(filter)
            .populate({
                path: 'userId',
                model: 'profiles',
                select: "firstName lastName designation"
            }).select("-__v")
            .sort(sortOption);

        const data = await query
            .limit(parseInt(limit, 10))
            .skip(parseInt(skip, 10));

        res.status(200).json({ success: true, data, totalDocuments: data.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};


exports.FieldMetaData = async (req, res) => {
    try {
        const { dataType } = req.query;

        const { dataType: type, filters } = getMetadataOfDataType(dataType);

        res.status(200).json({ success: true, dataType: type, filters });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}