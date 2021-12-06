const { default: checkStatus } = require("utils/checkStatus");

const dispatch = jest.fn();

const mockPayload = {
  data: {
    transaction: {
      status: "success",
      amount: "500",
    },
  },
  message: "Success",
};
test("it returns url when the status is open_url", () => {
  mockPayload.data.transaction.status = "open_url";
  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("url");
});

test("it returns pending when the status is pending", () => {
  mockPayload.data.transaction.status = "pending";
  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("pending");
});

test("it returns undefined when the status is failed", () => {
  mockPayload.data.transaction.status = "failed";
  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("failed");
});

test("it returns undefined when the status is success and you want to verify your card", () => {
  mockPayload.data.transaction.status = "success";
  mockPayload.message = "To complete your card verification";
  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("verify");
});

test("it returns undefined and toggles modal when the status is success and transaction already succeeded", () => {
  mockPayload.data.transaction.status = "success";
  mockPayload.message = "Transaction already succeeded";
  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("success");
});

test("it returns undefined and toggles pin modal", () => {
  mockPayload.data.transaction.status = "send_pin";

  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("pin");
});

test("it returns undefined and toggles otp modal", () => {
  mockPayload.data.transaction.status = "send_otp";

  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("otp");
});

test("it returns undefined and toggles otp modal", () => {
  mockPayload.data.transaction.status = "send_phone";

  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("phone");
});

test("it returns phone", () => {
  mockPayload.data.transaction.status = "send_phone";

  const result = checkStatus(mockPayload, dispatch);
  expect(result).toBe("phone");
});

test("no test case", () => {
  mockPayload.message = "Transaction";
  checkStatus(mockPayload, dispatch);
});

test("no test case", () => {
  mockPayload.data.transaction.status = "";
  checkStatus(mockPayload, dispatch);
});
