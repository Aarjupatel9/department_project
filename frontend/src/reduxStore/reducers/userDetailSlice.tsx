import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';


export interface userDetailState {
  value: userDetail,
  status: 'idle' | 'loading' | 'failed';
}
export interface userDetail {
  _id: string
  name: string
  email: string
  role: string
  isApproved: boolean
  isEmailVerified: boolean
  isVerified: boolean
  VerifiedBy: string
  __v: number
  isProfile: Boolean
}

export const userDetailTemplate = {
  email: "email",
  isApproved: false,
  isEmailVerified: true,
  isVerified: false,
  role: "",
  __v: 0,
  VerifiedBy: "",
  _id: "id",
  name: "name",
  isProfile: false
};


export interface userProfile {
  userId: string
  firstName: string
  lastName: string
  personalDetails: {
    mobileNo: String,
    employeeId: String,
    aadharNumber: Number,
    panNumber: String,
    dateOfBirth: Date,
  }
  bankDetails: {
    accNumber: Number|null,
    bankName: String,
    branch: String,
    IFSC_code: String,
  }
  designation: string
  address: {
    city: String,
    state: String,
    country: String,
    zip: String,
  }
  experience: Number|null
  joiningDate: Date
  profileImage: string
}

export const userProfileTemplate = {
  userId: "",
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
  __v: 0,
  profileImage: ""
};


const initialState: userDetailState = {
  value: userDetailTemplate,
  status: 'idle'
};


export const counterSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<userDetail>) => {
      // console.log("setAction method called : ", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setUserDetail } = counterSlice.actions;

export const selectUserDetails = (state: RootState) => state.userDetail.value;

export default counterSlice.reducer;


