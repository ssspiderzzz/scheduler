import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW_DAYS
} from "reducers/application";
import { useEffect, useReducer } from "react";
import axios from "axios";
const wss = new WebSocket("ws://localhost:3001");

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
