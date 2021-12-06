import testHook from "utils/testHook";
import useEyowo from "hooks/useEyowo";
import { act } from "@testing-library/react";

jest.mock("api/endpoints/cards");
jest.useFakeTimers();
describe("card component hook", () => {
  test(" returns correct values", async () => {
    const dispatch = jest.fn();

    // const response = {
    //   data: {
    //     card: { _id: "djjd" },
    //     transaction: { status: "pending", url: "url", reference: "xyz" },
    //   },
    //   message: "Success",
    // };
    let onClickPassword, loading;

    testHook(
      () => ({ onClickPassword, loading } = useEyowo()),
      {},
      dispatch,
      {},
      "pending"
    );

    await onClickPassword();
  });
});
