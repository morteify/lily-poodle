import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import InitialScreen from "./index";
import store from "../../../../app/store";
import { Provider } from "react-redux";

describe("InitialScreen component", () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <InitialScreen />
      </Provider>,
    );
  });

  it("should have the random quote embedded into the front page", async () => {
    expect(await screen.findByTestId("random-fact")).toBeInTheDocument();
  });

  afterAll(cleanup);
});
