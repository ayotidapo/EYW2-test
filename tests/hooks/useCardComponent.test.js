import testHook from "utils/testHook";
import useCardComponent from "hooks/useCardComponent";
import checkStatus from "utils/checkStatus";
jest.mock("utils/checkStatus");
jest.mock("api/endpoints/bills");
jest.useFakeTimers();


describe("card component hook", () => {
  test(" returns correct values", async () => {
    checkStatus.mockReturnValue("success");
    const dispatch = jest.fn();
    const eyowoStateData = {
      dispatch: jest.fn(),
      setCardId: (id) => {},
      payMerchant: (ref) => {},
      setPassword: jest.fn(),
      setErrorMessage: jest.fn(),
      chargeCard: jest.fn(),
    };
    const response = {
      data: {
        card: { _id: "djjd" },
        transaction: { status: "success", url: "url", reference: "xyz" },
      },
      message: "Success",
    };
    let validateConfirmVerifyCard,
      validatePin,
      validateOtp,
      validatePhone,
      onSuccessConfirmVerify,
      onErrorConfirmVerify,
      onSuccessPhone,
      onSuccessCardPin,
      onSuccessCardOtp,
      onSuccessVerifyCard,
      onErrorCardOtp;
    testHook(
      () =>
        ({
          validateConfirmVerifyCard,
          validatePin,
          validateOtp,
          validatePhone,
          onSuccessCardPin,
          onSuccessCardOtp,
          onSuccessConfirmVerify,
          onErrorConfirmVerify,
          onSuccessPhone,
          onSuccessVerifyCard,
          onErrorCardOtp,
        } = useCardComponent()),
      eyowoStateData,
      dispatch
    );

    onSuccessConfirmVerify(response);
    onErrorConfirmVerify("error");
    validatePin({ pin: "" });
    validatePin({ pin: "1.33" });
    validateOtp({ otp: "" });
    validateOtp({ otp: "1.33" });
    validatePhone({ phone: "" });
    validatePhone({ phone: "1.33" });
    validateConfirmVerifyCard({ amount: "" });
    validateConfirmVerifyCard({ amount: "001" });
    onSuccessVerifyCard(response);
    onSuccessPhone(response);
    onSuccessCardPin(response);
    onSuccessCardOtp(response);
    onErrorCardOtp();
    jest.runAllTimers();
  });
});
