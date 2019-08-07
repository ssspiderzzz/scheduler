export default function getAppointmentsForDay(state, day) {
  let selector = [];
  let tempAppoint = [];

  for (let days of state.days) {
    if (days.name === day) {
      tempAppoint = days.appointments;
    }
  }
  for (let i of tempAppoint) {
    selector.push(state.appointments[i]);
  }

  return selector;
}
