import React from "react";
import renderer from "react-test-renderer";

import Navbar from "./navbar";

describe("navbar", () => {
  it("renders", () => {
    const component = renderer.create(<Navbar />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
