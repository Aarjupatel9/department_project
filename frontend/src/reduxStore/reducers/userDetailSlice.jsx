import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { userDetailTemplate } from '../../interfaces/tamplates';





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


