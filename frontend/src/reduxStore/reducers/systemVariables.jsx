import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { systemVariablesTemplate } from '../../interfaces/tamplates';
// import { RootState, AppThunk } from '../store';



const initialState = {
  value: systemVariablesTemplate,
  status: 'idle'
};

export const systemVariables = createSlice({
  name: 'systemVariables',
  initialState,
  reducers: {
    setSystemVariable: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSystemVariable } = systemVariables.actions;

export const selectSystemVariables = (state) => state.systemVariables.value;

export default systemVariables.reducer;
