import React from "react";
import Enzyme, { shallow } from "enzyme";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import CreateDog from "./CreateDog";
import { Router, Link } from "react-router";

Enzyme.configure({ adapter: new Adapter() });

describe("<CreateDog />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CreateDog />);
  });

  it("Renderiza un <form>", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
  it("Renderiza seis <input>", () => {
    expect(wrapper.find("input")).toHaveLength(6);
  });
  it("Renderiza un <Link>", () => {
    expect(wrapper.find("Link")).toHaveLength(1);
  });
});
