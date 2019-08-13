import React, { useEffect } from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  const onAdd = () => {
    transition(CREATE);
  };
  const onCancel = () => {
    back();
  };
  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview, props.day)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };
  const onDelete = () => {
    transition(DELETING, true);
    props
      .deleteInterview(props.id, props.day)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };
  const onConfirm = () => {
    transition(CONFIRM);
  };
  const onEdit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interviewChanged !== null && (
        <Show
          student={props.interviewChanged.student}
          interviewer={props.interviewChanged.interviewer}
          onConfirm={onConfirm}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          name={""}
          interviewers={props.InterviewersForDay}
          onCancel={onCancel}
          onSave={onSave}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === SAVING && <Status status={"Saving"} />}
      {mode === DELETING && <Status status={"Deleting"} />}
      {mode === CONFIRM && <Confirm onCancel={onCancel} onDelete={onDelete} />}
      {mode === EDIT && (
        <Form
          name={props.interviewChanged.student}
          interviewer={props.interview.interviewer}
          interviewers={props.InterviewersForDay}
          onCancel={onCancel}
          onSave={onSave}
          bookInterview={props.bookInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error status={"Could not save appointment"} onCancel={onCancel} />
      )}
      {mode === ERROR_DELETE && (
        <Error status={"Could not delete appointment"} onCancel={onCancel} />
      )}
    </article>
  );
}
