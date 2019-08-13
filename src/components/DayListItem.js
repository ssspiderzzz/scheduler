import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
      data-testid="day"
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      {props.spots > 1 && <h4>{props.spots} spots remaining</h4>}
      {props.spots === 1 && <h4>{props.spots} spot remaining</h4>}
      {props.spots === 0 && <h4>no spots remaining</h4>}
    </li>
  );
}
