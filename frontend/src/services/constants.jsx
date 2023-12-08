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

export const tableHeadings = {
  achievements: ["achievementType", "achievedOn"],
  events: ["title", "isOrganizedByBVM", "eventType", "totalExpenses"],
  publications: ["title", "authors", "publicationType", "publicationDate"],
  qualifications: [
    "qualificationType",
    "thesisTitle",
    "specialization",
    "institute",
    "status",
  ],
  guides: ["guideType", "dissertationTitle", "guidedYear"],
  patents: ["title", "patentNumber", "patentDate", "inventors"],
};
