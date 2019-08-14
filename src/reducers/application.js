import { getAppointmentsForDay, getDayId, getSpots } from "helpers/selectors";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_INTERVIEW_DAYS = "SET_INTERVIEW_DAYS";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW_DAYS: {
      const nowState = state;
      nowState.appointments = action.appointments;
      const dayID = getDayId(action.day);
      const nowAppointments = getAppointmentsForDay(nowState, action.day);
      const nowSpots = getSpots(nowAppointments);
      const nowDay = state.days[dayID];
      nowDay.spots = nowSpots;
      const nowDays = state.days;
      nowDays[dayID] = nowDay;

      return {
        ...state,
        days: nowDays,
        appointments: action.appointments
      };
    }
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        }
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;
