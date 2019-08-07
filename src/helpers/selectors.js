function getAppointmentsForDay(state, day) {
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

function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let selector = {};

  for (let key in interview.interviewers) {
    selector.interviewer = interview.interviewers[key];
  }
  selector.student = interview.student;

  return selector;
}

export { getAppointmentsForDay, getInterview };
