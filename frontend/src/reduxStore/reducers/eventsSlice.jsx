import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { IEvent } from '../../interfaces/interfaces';



export const IEventsTemplate = [{
  _id: "",
  userId: "",
  title: "",
  description: "",
  isOrganizedByBVM: false,
  eventType: ",",
  contributors: [],
  experts: [],
  numberOfParticipants: 0,
  totalExpenses: 0,
  eventDate: {
    startDate: "",
    endDate: "",
  },
  organizedUnder: "",
  address: {
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  report: [{
    title: "",
    url: "",
  }],
}];
export const IEventTemplate = {
  _id: "",
  userId: "",
  title: "",
  description: "",
  isOrganizedByBVM: false,
  eventType: "",
  contributors: [],
  experts: [],
  numberOfParticipants: 0,
  totalExpenses: 0,
  eventDate: {
    startDate: "",
    endDate: ""
  },
  organizedUnder: "",
  address: {
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  reports: [],
};


const initialState = {
  value: IEventsTemplate,
  status: 'idle'
};


export const EventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsDetail: (state, action) => {
      // console.log("setAction method called : ", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setEventsDetail } = EventsSlice.actions;

export const selectEventsDetails = (state) => state.userDetail.value;

export default EventsSlice.reducer;


