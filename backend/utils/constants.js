const ROLES = {
    HEAD: 'head',
    SYSTEM_COORDINATOR: 'system coordinator',
    STAFF: 'staff',
    STD_USER: 'standard user',
};

const DESIGNATIONS = {
    HOD: 'hod',
    ASSOCIATE_PROFESSOR: 'associate professor',
    ASSISTANT_PROFESSOR: 'assistant professor',
    // Add more designations as needed
};

const AllRoles = [
    ROLES.HEAD,
    ROLES.STAFF,
    ROLES.STD_USER,
    ROLES.SYSTEM_COORDINATOR
];

const GUIDE_TYPE = {
    MTECH: "M tech",
    PHD: "PhD",
}

const PUBLICATION_TYPE = {
    JOURNALS: "journals",
    CONFERENCE: "conference",
}

const GRANT_TYPES = {
    FUNDING: 'Funding',
    SCHOLARSHIP: 'Scholarship',
    RESEARCH: 'Research'
};

const QUALIFICATION_STATUS = {
    COMPLETED: 'completed',
    PURSUING: 'pursuing'
};

const QUALIFICATION_TYPE = {
    BTECH: "B. tech.",
    MTECH: "M. tech.",
    PHD: "PhD"
}

module.exports = {
    ROLES,
    AllRoles,
    DESIGNATIONS,
    GRANT_TYPES,
    GUIDE_TYPE,
    PUBLICATION_TYPE,
    QUALIFICATION_STATUS,
    QUALIFICATION_TYPE
};
