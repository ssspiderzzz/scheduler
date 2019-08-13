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
  let key = interview.interviewer;

  selector.interviewer = state.interviewers[key];
  selector.student = interview.student;

  return selector;
}

function getInterviewersForDay(state, day) {
  let selector = [];
  let tempAppoint = [];

  for (let days of state.days) {
    if (days.name === day) {
      tempAppoint = days.interviewers;
    }
  }
  for (let i of tempAppoint) {
    selector.push(state.interviewers[i]);
  }

  return selector;
}

function getDayId(day) {
  switch (day) {
    case "Monday": {
      return 0;
    }
    case "Tuesday": {
      return 1;
    }
    case "Wednesday": {
      return 2;
    }
    case "Thursday": {
      return 3;
    }
    case "Friday": {
      return 4;
    }
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${day}`);
  }
}

function getSpots(appointments) {
  let spots = 0;
  for (let i of appointments) {
    if (i.interview === null) {
      spots += 1;
    }
  }
  return spots;
}

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
  getDayId,
  getSpots
};
