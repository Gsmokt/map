import { render, screen } from "@testing-library/react";
import Map from "../components/Map";

test("renders map component", () => {
  render(<Map />);
  it("should be map nad pdf in component", () => {
    const map = screen.getByTestId("map-container");
    const pdfLink = screen.getByText("Save to PDF");
    expect(map).toBeInTheDocument();
    expect(pdfLink).toBeInTheDocument();
  });
});
