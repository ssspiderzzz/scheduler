import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppoitments = appointments =>
    setState(prev => ({ ...prev, appointments }));

  useEffect(() => {
    // Promise.all([
    //   Promise.resolve(axios.get("/api/days")),
    //   Promise.resolve(axios.get("/api/appointments"))
    // ]).then(all => {
    //   console.log(`first promise: ${all[0].data}`);
    //   // setDays(all[0].data);
    //   console.log(`second promise: ${all[1].data}`);
    //   // setAppoitments(all[1].data);
    // });

    axios.get("/api/appointments").then(response => {
      console.log(response.data);
      setAppoitments(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/days").then(response => {
      console.log(response.data);
      setDays(response.data);
    });
  }, []);

  const appointmentsEach = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return <Appointment key={appointment.id} {...appointment} />;
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
      <section className="schedule">
        {appointmentsEach}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
