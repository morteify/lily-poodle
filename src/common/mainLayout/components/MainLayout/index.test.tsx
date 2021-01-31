import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InitialScreen from "./index";
import store from "../../../../app/store";
import { Provider } from "react-redux";
import MainLayout from "./index";
import { container } from "webpack";

describe("MainLayout component", () => {
  it("should display the sider open by default", async () => {
    const screen = await render(
      <Provider store={store}>
        <MainLayout />
      </Provider>,
    );
    const sider = await screen.findByTestId("main-layout-sider");

    expect(sider).toBeInTheDocument();
    expect(sider).toHaveStyle("width: 200px;");
  });

  it("should close the sider after clicking on a button", async () => {
    const screen = render(
      <Provider store={store}>
        <MainLayout />
      </Provider>,
    );
    const sider = await screen.findByTestId("main-layout-sider");
    const button = await screen.findByLabelText("menu-fold");

    expect(sider).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(sider).toHaveStyle("width: 0px;");
  });

  it("should contain a passed child", async () => {
    const screen = render(
      <Provider store={store}>
        <MainLayout>
          <p>Test child</p>
        </MainLayout>
      </Provider>,
    );
    const contentContainer = await screen.findByTestId("main-layout-site-content");

    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveTextContent("Test child");
  });

  it("should contain several passed children", async () => {
    const screen = render(
      <Provider store={store}>
        <MainLayout>
          <p>Test child 1</p>
          <h1>Test child 2</h1>
          <a>Test child 3</a>
        </MainLayout>
      </Provider>,
    );
    const contentContainer = await screen.findByTestId("main-layout-site-content");

    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveTextContent("Test child 1");
    expect(contentContainer).toHaveTextContent("Test child 2");
    expect(contentContainer).toHaveTextContent("Test child 3");
  });

  afterEach(cleanup);
});