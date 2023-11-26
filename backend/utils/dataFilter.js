const Achievement = require("../models/achievementModel");
const Publication = require("../models/publicationModel");
const Event = require("../models/eventsModel");
const Qualification = require("../models/qualificationModel");
const Patent = require("../models/patentModel");
const Guide = require("../models/guideModel");

const dataTypeModelMap = {
  achievements: Achievement,
  events: Event,
  publications: Publication,
  qualifications: Qualification,
  guides: Guide,
  patents: Patent
};

// Function to get metadata for a specific datatype
function getMetadataOfDataType(dataType) {
  const Model = dataTypeModelMap[dataType];

  if (!Model) {
    return { dataType, filters: [] };
  }

  // Extract schema paths to generate filters
  const filters = Object.keys(Model.schema.paths)
    .filter(field => !field.startsWith('_'))
    .map(field => {
      const { type, enum: enumValues } = Model.schema.paths[field].options;
      return { 
        field, 
        type: Array.isArray(type) ? type[0].name : type.name, 
        ...(enumValues && { enumValues }) };
    })
    .filter(Boolean);

  console.log('filters : ',filters);
  

  return { dataType, filters };
}

module.exports = {
  getMetadataOfDataType,
  dataTypeModelMap
};