import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "components/Button";
import {
  ModalLoader,
  TransparentModalLoader,
  PageLoader,
} from "components/Loader";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});
describe("button and loaders test", () => {
  test("button loading", () => {
    const { getByTestId } = render(<Button loading />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  test("button not loading and firing click", async () => {
    const onClick = jest.mock;
    const { getByTestId } = render(
      <Button variable="ispresent" onClick={onClick} buttonValue="Submit" />
    );
    const button = getByTestId("button");
    act(() => {
      fireEvent.click(button);
    });
  });

  test("modal loader renders correctly", async () => {
    const { getByTestId } = render(
      <ModalLoader message="Loading.. Please wait" />
    );
    const loader = getByTestId("modal-loader");
    expect(loader).toBeInTheDocument();
  });

  test("transparent modal loader renders correctly", async () => {
    const { getByTestId } = render(<TransparentModalLoader />);
    const loader = getByTestId("transparent-modal-loader");
    expect(loader).toBeInTheDocument();
  });

  test("transparent modal loader renders correctly", async () => {
    const { getByTestId } = render(<PageLoader />);
    const loader = getByTestId("page-loader");
    expect(loader).toBeInTheDocument();
  });
});
