import React from "react";
import { render, screen } from "@testing-library/react";
import MyDocument from "../components/Document";

test("renders MyDocument component", () => {
  render(
    <MyDocument
      data={{
        cost: 100,
        origin: "Warszawa",
        destination: "Płock",
        distance: 1000,
      }}
    />
  );
  it("should be in component", () => {
    const map = screen.getByTestId("map-container");
    const routeElement = screen.getByText("Route: Warszawa - Płock");
    const distanceElement = screen.getByText("Distance: 1000 km");
    const costElement = screen.getByText("Travel Cost: 100 $");
    expect(map).toBeInTheDocument();
    expect(routeElement).toBeInTheDocument();
    expect(distanceElement).toBeInTheDocument();
    expect(costElement).toBeInTheDocument();
  });
});
