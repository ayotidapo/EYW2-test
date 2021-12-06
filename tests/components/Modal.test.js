import React from "react";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import FailureModal from "components/Modals/FailureModal";
import SuccessModal from "components/Modals/SuccessModal";
import Failed from "components/TrasactionFailed/Failed";
import { EyowoPaymentContext } from "config/Provider";

const consoleError = console.error;
beforeEach(() => {
  cleanup();
  console.error = () => {};
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  console.error = consoleError;
});

global.window = Object.create(window);
describe("modal tests", () => {
  test("renders failure modal", () => {
    const { getByTestId } = render(
      <FailureModal
        onClose={(e) => {
          e.preventDefault();
          jest.fn();
        }}
        message="failed"
      />
    );

    const close = getByTestId("close");
    act(() => {
      fireEvent.click(close);
    });
  });

  test("renders success modal with redirect url", () => {
    const { getByTestId } = render(
      <SuccessModal
        onClose={(e) => {
          e.preventDefault();
          jest.fn();
        }}
        redirectURL="url"
        message="failed"
      />
    );

    const close = getByTestId("close");
    act(() => {
      fireEvent.click(close);
    });
  });

  test("renders success modal without redirect url", () => {
    global.URLSearchParams = jest.fn((x) => ({
      get: jest.fn((y) => {
        return { redirect_url: "hejek" };
      }),
    }));
    const { getByTestId } = render(<SuccessModal storeName="name" />);

    const close = getByTestId("close");
    act(() => {
      fireEvent.click(close);
    });
  });

  test("renders failed component", () => {
    const eyowoStateData = {
      failureMessage: "Message",
      dispatch: jest.fn(),
    };
    const { getByTestId } = render(
      <EyowoPaymentContext.Provider value={{ eyowoStateData }}>
        <Failed onClick={jest.fn()} />
      </EyowoPaymentContext.Provider>
    );

    expect(getByTestId("failed")).toBeInTheDocument();

    const retry = getByTestId("retry");
    act(() => {
      fireEvent.click(retry);
    });
  });
});
