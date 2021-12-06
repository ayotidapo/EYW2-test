import { focusElement } from "utils/focus";
test("It focuses on element", async () => {
  const response = focusElement("#element");
  expect(response).toBeUndefined();
});
