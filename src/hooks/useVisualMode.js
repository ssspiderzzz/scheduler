import { useState } from "react";

export default function useVisualMode(originalMode) {
  const [state, setState] = useState([originalMode]);

  function transition(transTo, replace) {
    if (replace) {
      setState(prev => [...prev.slice(0, prev.length - 1), transTo]);
    } else {
      setState(prev => [...prev, transTo]);
    }
  }

  function back() {
    if (state.length < 2) return;
    setState(prev => [...prev.slice(0, prev.length - 1)]);
  }

  return { mode: state[state.length - 1], transition, back };
}
