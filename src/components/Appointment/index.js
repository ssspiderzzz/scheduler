import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  let state;
  if (props.interview) {
    state = props.useVisualMode(SHOW);
  } else {
    state = props.useVisualMode(EMPTY);
  }
  const onAdd = () => {
    state.transition(CREATE);
  };
  const onCancel = () => {
    state.back();
  };
  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    state.transition(SAVING);
    props.bookInterview(props.id, interview).then(() => state.transition(SHOW));
  };
  const onDelete = () => {
    state.transition(DELETING);
    props.deleteInterview(props.id).then(() => state.transition(EMPTY));
  };
  const onConfirm = () => {
    state.transition(CONFIRM);
  };
  const onEdit = () => {
    state.transition(EDIT);
  };

  return (
    <div>
      <Header key={props.id} time={props.time} />
      {state.mode === EMPTY && <Empty onAdd={onAdd} />}
      {state.mode === SHOW && (
        <Show
          student={props.interviewChanged.student}
          interviewer={props.interviewChanged.interviewer}
          onConfirm={onConfirm}
          onEdit={onEdit}
        />
      )}
      {state.mode === CREATE && (
        <Form
          name={""}
          interviewers={props.InterviewersForDay}
          onCancel={onCancel}
          onSave={onSave}
          bookInterview={props.bookInterview}
        />
      )}
      {state.mode === SAVING && <Status status={"Saving"} />}
      {state.mode === DELETING && <Status status={"Deleting"} />}
      {state.mode === CONFIRM && (
        <Confirm onCancel={onCancel} onDelete={onDelete} />
      )}
      {state.mode === EDIT && (
        <Form
          name={props.interviewChanged.student}
          interviewer={props.interview.interviewer}
          interviewers={props.InterviewersForDay}
          onCancel={onCancel}
          onSave={onSave}
          bookInterview={props.bookInterview}
        />
      )}
    </div>
  );
}
