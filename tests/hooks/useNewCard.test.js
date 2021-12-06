import testHook from "utils/testHook";
import useNewCard from "hooks/useNewCard";

jest.mock("api/endpoints/cards");
jest.useFakeTimers();
describe("card component hook", () => {
  test(" returns correct values", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = {
      dispatch: jest.fn(),
      setCardId: jest.fn(),
      verifyTransaction: jest.fn(),
      payMerchant: (ref) => {},
      setPriority: jest.fn(),
      setErrorMessage: jest.fn(),
      chargeCard: jest.fn(),
    };
    const response = {
      data: {
        card: { _id: "djjd" },
        transaction: { status: "pending", url: "url", reference: "xyz" },
      },
      message: "Success",
    };
    let validate,
      onSuccessAddCard,
      onErrorPreviouslyAddedCard,
      onErrorAddCard,
      createCard;

    testHook(
      () =>
        ({
          validate,
          onSuccessAddCard,
          onErrorAddCard,
          onErrorPreviouslyAddedCard,
          createCard,
        } = useNewCard("eyowo", jest.fn(), jest.fn())),
      eyowoStateData,
      dispatch,
      {},
      "approved"
    );

    validate({ pan: "", expiry: "", cvv: "" });
    validate({ pan: "u4u4u4u", expiry: "", cvv: "" });
    validate({ pan: "u4u4u4u", expiry: "rfjrjr", cvv: "" });
    onSuccessAddCard(response);
    onErrorPreviouslyAddedCard();
    onErrorAddCard();
    createCard({ pan: "50663367475785855", expiry: "01/2022", cvv: "123" });
  });

  test(" returns correct values", async () => {
    const dispatch = jest.fn();
    const eyowoStateData = {
      dispatch: jest.fn(),
      setCardId: jest.fn(),
      verifyTransaction: jest.fn(),
      payMerchant: (ref) => {},
      setPriority: jest.fn(),
      setErrorMessage: jest.fn(),
      chargeCard: jest.fn(),
    };
    const response = {
      data: {
        card: { _id: "djjd" },
        transaction: { status: "pending", url: "url", reference: "xyz" },
      },
      message: "Success",
    };
    let validate,
      onSuccessAddCard,
      onErrorPreviouslyAddedCard,
      onErrorAddCard,
      createCard;

    testHook(
      () =>
        ({
          validate,
          onSuccessAddCard,
          onErrorAddCard,
          onErrorPreviouslyAddedCard,
          createCard,
        } = useNewCard("eyowo", jest.fn(), jest.fn())),
      eyowoStateData,
      dispatch,
      {},
      "pending"
    );

    validate({ pan: "", expiry: "", cvv: "" });
    validate({ pan: "u4u4u4u", expiry: "", cvv: "" });
    validate({ pan: "u4u4u4u", expiry: "rfjrjr", cvv: "" });
    onSuccessAddCard(response);
    onErrorPreviouslyAddedCard();
    onErrorAddCard();
    createCard({ pan: "50663367475785855", expiry: "01/2022", cvv: "123" });
  });
});
