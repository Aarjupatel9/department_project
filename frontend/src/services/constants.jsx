export const defaultUserProfileImage =
  "https://massengeruserprofileimage.s3.ap-south-1.amazonaws.com/general-contact-icon.jpg";

export const fetchPostOptions = {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
  },
};

export const dataTypes = [
  "achievements",
  "events",
  "publications",
  "qualifications",
  "guides",
  "patents",
];

export const dataTypesMapper = {
  "achievements": { route: "achievementview" },
  "events": {
    route: "eventview"
  },
  "publications": {
    route: "publicationview"
  },
  "qualifications": {
    route: "qualificationview"
  },
  "guides": {
    route: "guideview"
  },
  "patents": {
    route: "patentview"
  }
}

export const tableHeadings = {
  achievements: ["achievementType", "achievedOn", "certificates"],
  events: ["title", "isOrganizedByBVM", "eventType", "totalExpenses", "reports"],
  publications: ["title", "authors", "publicationType", "publicationDate", "reports"],
  qualifications: [
    "qualificationType",
    "specialization",
    "institute",
    "status",
    "certificates"
  ],
  guides: ["guideType", "dissertationTitle", "guidedYear", "reports"],
  patents: ["title", "patentNumber", "patentDate", "inventors", "reports"],
};

export const dateTypeVar = ["achievedOn", "publicationDate","patentDate"]
export const fileTypeField = [ "reports", "certificates"]
