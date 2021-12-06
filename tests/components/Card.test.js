import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CardOtp from "components/Card/CardOtp";
import InputForm from "components/Form/InputForm";
import {
  EyowoPaymentContext,
  CardPaymentContext,
  CheckoutContext,
} from "config/Provider";
import TextField from "components/TextField";
import useCompatibility from "components/TextField/useCompatibility";
import Error from "components/Error";
import CardPin from "components/Card/CardPin";
import CardPhone from "components/Card/CardPhone";
import ConfirmVerifyCard from "components/Card/ConfirmVerifyCard";
import Redirect from "components/Card/Redirect";
import VerifyCard from "components/Card/VerifyCard";
import NewCard from "components/Card/NewCard";

import useNewCard from "hooks/useNewCard";
jest.mock("components/TextField/useCompatibility");
jest.mock("hooks/useNewCard");
jest.mock("api/endpoints/cards");
jest.useFakeTimers();
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

describe("card components tests", () => {
  test("input with button clicks and error", () => {
    const eyowoStateData = {
      errorMessage: "error",
      setErrorMessage: () => {},
    };
    const { getByTestId } = render(
      <EyowoPaymentContext.Provider value={{ eyowoStateData }}>
        <InputForm
          error="error"
          amountInput="true"
          errorMessage="error"
          value="500"
          onClick={jest.mock}
        />
      </EyowoPaymentContext.Provider>
    );
    const button = getByTestId("input-button");
    const input = getByTestId("input");
    act(() => {
      fireEvent.click(button);
    });
    act(() => {
      fireEvent.submit(input);
    });
    expect(getByTestId("input-form")).toBeInTheDocument();
    expect(getByTestId("error")).toBeInTheDocument();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
  });
  test("input form loading", () => {
    const isCompartible = true;
    useCompatibility.mockReturnValue([isCompartible]);
    const { getByTestId } = render(<InputForm loading />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  test("text field renders for masked input", () => {
    const isCompartible = true;
    useCompatibility.mockReturnValue([isCompartible]);
    const { getByTestId } = render(
      <TextField
        isMasked
        type="text"
        value="value"
        errorMessage="error"
        withimage="true"
      />
    );
    expect(getByTestId("textfield")).toBeInTheDocument();
  });

  test("text field renders for non- masked input", () => {
    const isCompartible = true;
    useCompatibility.mockReturnValue({ isCompartible });
    const { getByTestId } = render(
      <TextField
        type="password"
        value="value"
        isPassword="true"
        withimage="true"
      />
    );
    expect(getByTestId("textfield")).toBeInTheDocument();
  });

  test("error component renders corrent", () => {
    let errorMessage = "";
    const setErrorMessage = () => {};
    const { getByTestId } = render(
      <CardPaymentContext.Provider value={{ errorMessage, setErrorMessage }}>
        <Error isCard />
      </CardPaymentContext.Provider>
    );
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(getByTestId("error")).toBeInTheDocument();
  });

  test("renders card otp component", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = { dispatch: jest.fn(), setPassword: jest.fn() };

    const { getByTestId, container } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <CardOtp />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const otp = container.querySelector('input[name="otp"]');
    const button = getByTestId("input-button");
    const back = getByTestId("back");
    act(() => {
      fireEvent.change(otp, {
        target: {
          value: "123456",
        },
      });
    });

    act(() => {
      fireEvent.click(button);
    });
    act(() => {
      fireEvent.click(back);
    });
    await waitForElementToBeRemoved(() => getByTestId("loader"));
  });

  test("renders card pin component", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = { dispatch: jest.fn(), setPassword: jest.fn() };

    const { getByTestId, container } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <CardPin />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const pin = container.querySelector('input[name="pin"]');
    const button = getByTestId("input-button");
    const back = getByTestId("back");
    act(() => {
      fireEvent.change(pin, {
        target: {
          value: "1234",
        },
      });
    });

    act(() => {
      fireEvent.click(button);
    });
    act(() => {
      fireEvent.click(back);
    });
    await waitForElementToBeRemoved(() => getByTestId("loader"));
  });

  test("renders card phone component", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = { dispatch: jest.fn(), setPassword: jest.fn() };

    const { getByTestId, container } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <CardPhone />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const phone = container.querySelector('input[name="phone"]');
    const button = getByTestId("input-button");
    const back = getByTestId("back");
    act(() => {
      fireEvent.change(phone, {
        target: {
          value: "2349027891737",
        },
      });
    });

    act(() => {
      fireEvent.click(button);
    });
    act(() => {
      fireEvent.click(back);
    });
    await waitForElementToBeRemoved(() => getByTestId("loader"));
  });

  test("renders card confirm verify card component", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = { dispatch: jest.fn(), setPassword: jest.fn() };

    const { getByTestId, container } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <ConfirmVerifyCard />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const back = getByTestId("back");
    const button = getByTestId("input-button");
    const amount = container.querySelector('input[name="amount"]');
    act(() => {
      fireEvent.change(amount, {
        target: {
          value: "N5,000",
        },
      });
    });

    act(() => {
      fireEvent.click(button);
    });
    act(() => {
      fireEvent.click(back);
    });
    await waitForElementToBeRemoved(() => getByTestId("loader"));
  });

  test("renders Redirect component loading false", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = {
      dispatch: jest.fn(),
      setPassword: jest.fn(),
      setIframe: jest.fn(),
      loading: false,
    };

    const { getByTestId } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <Redirect />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    expect(getByTestId("redirect")).toBeInTheDocument();

    const cancel = getByTestId("cancel");
    const proceed = getByTestId("proceed");

    act(() => {
      fireEvent.click(cancel);
      fireEvent.click(proceed);
    });
  });

  test("renders Redirect component loading true", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = {
      dispatch: jest.fn(),
      setPassword: jest.fn(),
      setIframe: jest.fn(),
      loading: true,
    };

    const { getByTestId } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <Redirect />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    expect(getByTestId("modal-loader")).toBeInTheDocument();
  });

  test("renders verify card component", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = { dispatch: jest.fn(), setPassword: jest.fn() };

    const { getByTestId } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <VerifyCard />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    const back = getByTestId("back");
    const button = getByTestId("button");
    const cancel = getByTestId("cancel");

    act(() => {
      fireEvent.click(button);
      fireEvent.click(cancel);
    });
    act(() => {
      fireEvent.click(back);
    });
    await waitForElementToBeRemoved(() => getByTestId("loader"));
  });

  test("renders Verify component loading true", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = {};

    const { getByTestId } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, pageLoader: true }}
        >
          <VerifyCard />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );

    expect(getByTestId("modal-loader")).toBeInTheDocument();
  });

  test("renders new card component", async () => {
    useNewCard.mockReturnValue({
      createCard: jest.fn(),
      setLoading: jest.fn(),
    });
    const dispatch = jest.fn();
    const eyowoStateData = { dispatch: jest.fn(), setPassword: jest.fn() };

    const { getByTestId, container } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <EyowoPaymentContext.Provider
          value={{ eyowoStateData, reference: "638499gg" }}
        >
          <NewCard
            card_number="5060666666666666666"
            expiry_date="02/20"
            origin="eyowo"
            cvvv="123"
            setHide={jest.fn()}
          />
        </EyowoPaymentContext.Provider>
      </CheckoutContext.Provider>
    );
    const pan = container.querySelector('input[name="pan"]');
    const expiry = container.querySelector('input[name="expiry"]');
    const cvv = container.querySelector('input[name="cvv"]');
    const button = getByTestId("button");
    fireEvent.change(pan, {
      target: {
        value: "5060666666666666666",
      },
    });

    fireEvent.change(expiry, {
      target: {
        value: "10/22",
      },
    });

    fireEvent.change(cvv, {
      target: {
        value: "123",
      },
    });

    act(() => {
      fireEvent.click(button);
    });

    await waitForElementToBeRemoved(() => getByTestId("loader"));

    expect(getByTestId("new-card")).toBeInTheDocument();
  });

  test("renders new card component", async () => {
    useNewCard.mockReturnValue({
      createCard: jest.fn(),
      setLoading: jest.fn(),
    });
    const dispatch = jest.fn();

    const { getByTestId, container } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <CardPaymentContext.Provider value={{}}>
          <NewCard
            dispatch={jest.fn()}
            card_number="5060666666666666666"
            expiry_date="02/20"
            origin="card_payment"
            cvvv="123"
            setHide={jest.fn()}
          />
        </CardPaymentContext.Provider>
      </CheckoutContext.Provider>
    );
    const pan = container.querySelector('input[name="pan"]');
    const expiry = container.querySelector('input[name="expiry"]');
    const cvv = container.querySelector('input[name="cvv"]');
    const button = getByTestId("button");
    fireEvent.change(pan, {
      target: {
        value: "5060666666666666666",
      },
    });

    fireEvent.change(expiry, {
      target: {
        value: "10/22",
      },
    });

    fireEvent.change(cvv, {
      target: {
        value: "123",
      },
    });

    act(() => {
      fireEvent.click(button);
    });

    await waitForElementToBeRemoved(() => getByTestId("loader"));

    expect(getByTestId("new-card")).toBeInTheDocument();
  });

  test("renders new card component", async () => {
    useNewCard.mockReturnValue({
      createCard: jest.fn(),
      setLoading: jest.fn(),
      loading: true,
    });
    const dispatch = jest.fn();

    const { getByTestId } = render(
      <CheckoutContext.Provider value={{ dispatch }}>
        <CardPaymentContext.Provider value={{}}>
          <NewCard
            dispatch={jest.fn()}
            card_number="5060666666666666666"
            expiry_date="02/20"
            origin="card_payment"
            cvvv="123"
            setHide={jest.fn()}
          />
        </CardPaymentContext.Provider>
      </CheckoutContext.Provider>
    );
    expect(getByTestId("modal-loader")).toBeInTheDocument();
  });
});
