import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  const InterviewersForDay = getInterviewersForDay(state, state.day);

  const appointmentsEach = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          {...appointment}
          key={appointment.id}
          interviewChanged={interview}
          InterviewersForDay={InterviewersForDay}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
          day={state.day}
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
