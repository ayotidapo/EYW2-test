import React from "react";
import { CheckoutContext, EyowoPaymentContext } from "config/Provider";
import Iframe from "components/Iframe";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("iframe tests", () => {
  test("iframe is opened", () => {
    const eyowoStateData = {
      dispatch: jest.fn(),
      setIframe: jest.fn(),
      verifyTransaction: jest.fn(),
      iframe: true,
    };
    const { getByTestId } = render(
      <CheckoutContext.Provider
        value={{ dispatch: jest.fn(), state: { url: "url" } }}
      >
        <EyowoPaymentContext.Provider value={{ eyowoStateData }}>
          <Iframe />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const close = getByTestId("close");
    act(() => {
      fireEvent.click(close);
    });
  });

  test("iframe is closed", () => {
    const eyowoStateData = {
      dispatch: jest.fn(),
      setIframe: jest.fn(),
      verifyTransaction: jest.fn(),
      iframe: false,
    };
    const { getByTestId } = render(
      <CheckoutContext.Provider
        value={{ dispatch: jest.fn(), state: { url: "url" } }}
      >
        <EyowoPaymentContext.Provider value={{ eyowoStateData }}>
          <Iframe />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const close = getByTestId("close");
    act(() => {
      fireEvent.click(close);
    });
  });
});
