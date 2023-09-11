import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';


export interface EventsState {
  value: IEvent[],
  status: 'idle' | 'loading' | 'failed';
}
export interface IEvent {
  userId: string;
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

export const IEventsTemplate = [{
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
    startDate: new Date(),
    endDate: new Date(),
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
    startDate: new Date(),
    endDate: new Date(),
  },
  organizedUnder: "",
  address: {
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  report: [],
};


const initialState: EventsState = {
  value: IEventsTemplate,
  status: 'idle'
};


export const EventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsDetail: (state, action: PayloadAction<IEvent[]>) => {
      // console.log("setAction method called : ", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setEventsDetail } = EventsSlice.actions;

export const selectEventsDetails = (state: RootState) => state.userDetail.value;

export default EventsSlice.reducer;


