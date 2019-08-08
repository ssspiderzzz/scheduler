import { useState } from "react";

export default function useVisualMode(originalMode) {
  const [state, setState] = useState({
    mode: originalMode,
    transition,
    history: [originalMode],
    back
  });

  function transition(transTo, replace) {
    let tempHistory = state.history;
    if (replace) {
      tempHistory.pop();
      tempHistory.push(transTo);
      setState(prev => ({ ...prev, mode: transTo, history: tempHistory }));
    } else {
      tempHistory.push(transTo);
      setState(prev => ({ ...prev, mode: transTo, history: tempHistory }));
    }
  }

  function back() {
    let tempHistory = state.history;
    tempHistory.pop();
    const last = tempHistory.length - 1;
    setState(prev => ({
      ...prev,
      mode: tempHistory[last],
      history: tempHistory
    }));
  }

  return state;
}
