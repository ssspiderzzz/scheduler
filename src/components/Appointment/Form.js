import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Confirm(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
    console.log(`Now reset, name is: ${name}, interviewer is: ${interviewer}`);
  }

  function save() {
    console.log(`Now save`);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          setInterviewer={props.setInterviewer}
          interviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => reset()}>
            Cancel
          </Button>
          <Button confirm onClick={() => save()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
