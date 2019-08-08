import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    return axios
      .put(`http://localhost:3001/api/appointments/${id}`, { interview })
      .then(r =>
        Promise.all([axios.get("/api/appointments")]).then(all => {
          setState(prev => ({
            ...prev,
            appointments: all[0].data
          }));
        })
      );
  }

  function deleteInterview(id) {
    return axios
      .delete(`http://localhost:3001/api/appointments/${id}`)
      .then(r =>
        Promise.all([axios.get("/api/appointments")]).then(all => {
          setState(prev => ({
            ...prev,
            appointments: all[0].data
          }));
        })
      );
  }

  const appointmentsEach = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interview = getInterview(state, appointment.interview);
      const InterviewersForDay = getInterviewersForDay(state, state.day);
      return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interviewChanged={interview}
          InterviewersForDay={InterviewersForDay}
          useVisualMode={useVisualMode}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList days={state.days} day={state.day} setDay={setDay} />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentsEach}</section>
    </main>
  );
}
