import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';


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

const initialState: systemVariablesState = {
  value: systemVariablesTemplate,
  status: 'idle'
};

export const systemVariables = createSlice({
  name: 'systemVariables',
  initialState,
  reducers: {
    setSystemVariable: (state, action: PayloadAction<systemVariables>) => {
      state.value = action.payload;
    },
  },
});

export const { setSystemVariable } = systemVariables.actions;

export const selectSystemVariables = (state: RootState) => state.systemVariables.value;

export default systemVariables.reducer;
