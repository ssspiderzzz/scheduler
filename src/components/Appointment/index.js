import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  let block;

  if (props.interview) {
    block = <Show interview={props.interview} />;
  } else {
    block = <Empty />;
  }
  return (
    <div>
      <Header key={props.id} time={props.time} />
      {block}
    </div>
  );
}
