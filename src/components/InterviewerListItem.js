import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewersClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewersClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.id}
        onClick={() => props.setInterviewer(props.id)}
      />
      {props.selected && props.name}
    </li>
  );
}
