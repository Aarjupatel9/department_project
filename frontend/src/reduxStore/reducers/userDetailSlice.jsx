import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';




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


const initialState = {
  value: userDetailTemplate,
  status: 'idle'
};


export const counterSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      // console.log("setAction method called : ", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setUserDetail } = counterSlice.actions;

export const selectUserDetails = (state) => state.userDetail.value;

export default counterSlice.reducer;


