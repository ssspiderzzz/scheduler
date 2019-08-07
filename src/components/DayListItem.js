import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <article
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      <h4>{props.spots} spots remaining</h4>
    </article>
  );
}
