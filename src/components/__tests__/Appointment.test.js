/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, waitForElement } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

axios.defaults.baseURL = "http://localhost:3001";
/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"));
  });
});
