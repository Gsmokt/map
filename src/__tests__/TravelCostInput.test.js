import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TravelCostInput from "../components/TravelCostInput";

describe("TravelCostInput", () => {
  const setState = jest.fn();
  render(<TravelCostInput value={1} setValue={setState} />);
  const increment = screen.getByTestId("increment");
  const decrement = screen.getByTestId("decrement");
  const inputValue = screen.getByTestId("input_value");
  expect(inputValue.textContent).toBe(1);
  fireEvent.change(inputValue, { target: { value: 2 } });
  expect(inputValue.textContent).toBe(2);
  fireEvent.click(increment);
  expect(inputValue.textContent).toBe(3);
  fireEvent.click(decrement);
  expect(inputValue.textContent).toBe(2);
});
