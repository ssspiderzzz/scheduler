import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

axios.defaults.baseURL = "http://localhost:3001";

it("renders without crashing", () => {
  const { getByText } = render(<Application />);
  return waitForElement(() => getByText("Monday"));
});
