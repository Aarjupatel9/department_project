export const userDetailTemplate = {
    email: "email",
    isApproved: false,
    isEmailVerified: true,
    isVerified: false,
    role: "",
    VerifiedBy: "",
    _id: "id",
    name: "name",
    isProfile: false,
    profileImage: "https://massengeruserprofileimage.s3.ap-south-1.amazonaws.com/general-contact-icon.jpg"
  };
  
  export const userProfileTemplate = {
    firstName: "",
    lastName: "",
    personalDetails: {
      mobileNo: "",
      employeeId: "",
      aadharNumber: 0,
      panNumber: "",
      dateOfBirth: new Date(),
    },
    bankDetails: {
      accNumber: 0,
      bankName: "",
      branch: "",
      IFSC_code: "",
    },
    designation: "",
    address: {
      city: "",
      state: "",
      country: "",
      zip: "",
    },
    experience: 0,
    joiningDate: new Date(),
  };
  export const systemVariablesTemplate = {
    ROLES: {
      HEAD: 'head',
      SYSTEM_COORDINATOR: 'system coordinator',
      STAFF: 'staff',
      STD_USER: 'standard user',
    },
    DESIGNATIONS: {
      HOD: 'hod',
      ASSOCIATE_PROFESSOR: 'associate professor',
      ASSISTANT_PROFESSOR: 'assistant professor',
    },
    GUIDE_TYPE: {
      MTECH: "M tech",
      PHD: "PhD",
    },
    PUBLICATION_TYPE: {
      JOURNALS: "journals",
      CONFERENCE: "conference",
    },
    GRANT_TYPES: {
      FUNDING: 'Funding',
      SCHOLARSHIP: 'Scholarship',
      RESEARCH: 'Research'
    },
    QUALIFICATION_STATUS: {
      COMPLETED: 'completed',
      PURSUING: 'pursuing'
    },
    QUALIFICATION_TYPE: {
      BTECH: "B. tech.",
      MTECH: "M. tech.",
      PHD: "PhD"
    }
  }