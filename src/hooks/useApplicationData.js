import { getAppointmentsForDay, getDayId, getSpots } from "helpers/selectors";
import { useEffect, useReducer } from "react";
import axios from "axios";
const wss = new WebSocket("ws://localhost:3001");

export default function useApplicationData(props) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_INTERVIEW_DAYS = "SET_INTERVIEW_DAYS";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(all => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    wss.onmessage = message => {
      const dataFromServer = JSON.parse(message.data);
      dispatch({
        type: dataFromServer.type,
        ...dataFromServer
      });
    };
  });

  function bookInterview(id, interview, day) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(r =>
      Promise.all([axios.get("/api/appointments")]).then(all => {
        dispatch({
          type: SET_INTERVIEW_DAYS,
          appointments: all[0].data,
          day: day
        });
      })
    );
  }

  function deleteInterview(id, day) {
    return axios.delete(`/api/appointments/${id}`).then(r =>
      Promise.all([axios.get("/api/appointments")])
        .then(all => {
          dispatch({
            type: SET_INTERVIEW_DAYS,
            appointments: all[0].data,
            day: day
          });
        })
        .catch(error => console.log(error))
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
}
