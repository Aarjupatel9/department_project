export interface ApiRequestOptions {
    method: String,
    credentials: String,
    headers: {
        "Content-Type": String,
        "Access-Control-Allow-Origin": String,
        "Access-Control-Allow-Method": String,
        "Access-Control-Allow-Headers": String,
    },
    body: String
}
export interface loginCredentials {
    email: String,
    password: String
}

export interface User { //made for editUserAccountRequest 
    isApproved: boolean
    isEmailVerified: boolean
    isVerified: boolean
    verifiedBy: string | "not verified"
    role: string
    __v: number
    _id: string
    email: string;
}

export interface IEvent {//made for eventSlice
    _id: String;
    userId: any;
    title: string;
    description: string;
    isOrganizedByBVM: boolean;
    eventType: string;
    contributors: string[];
    experts: string[];
    numberOfParticipants: number;
    totalExpenses: number;
    eventDate: {
        startDate: Date;
        endDate: Date;
    };
    organizedUnder: string;
    address: {
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    report: {
        title: string;
        url: string;
    }[];
}





export interface systemVariablesState {
    value: systemVariables,
    status: 'idle' | 'loading' | 'failed';
  }
  export interface systemVariables {
    ROLES: {
      HEAD: String,
      STD_USER: String,
      STAFF: String,
      SYSTEM_COORDINATOR: String,
    },
    DESIGNATIONS: {
      HOD: String,
      ASSOCIATE_PROFESSOR: String,
      ASSISTANT_PROFESSOR: String,
    },
    GUIDE_TYPE: {
      MTECH: String,
      PHD: String,
    },
    PUBLICATION_TYPE: {
      JOURNALS: String,
      CONFERENCE: String,
    },
    GRANT_TYPES: {
      FUNDING: String,
      SCHOLARSHIP: String,
      RESEARCH: String
    },
    QUALIFICATION_STATUS: {
      COMPLETED: String,
      PURSUING: String
    },
    QUALIFICATION_TYPE: {
      BTECH: String,
      MTECH: String,
      PHD: String
    }
  }