import { render, renderHook, screen } from "@testing-library/react";
import { Greet } from "./Greet";
import { useState } from "react";

test("should render Greet Component", () => {
  render(<Greet name='Alpha'/>)
  const textElement = screen.getByText(`Greetings! Alpha`)
  expect(textElement).toBeInTheDocument()
});

test("should render Greet Component", () => {
  render(<Greet name='Gel'/>)
  const textElement = screen.getByText(`Greetings! Gel`)
  expect(textElement).toBeInTheDocument()
});

test("useState should return a state and a setState function", () => {
  const { result } = renderHook(() => useState(null));
  const [data, setData] = result.current;

  expect(data).toBe(null);
  expect(setData).toBeInstanceOf(Function);
});
 