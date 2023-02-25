import { render } from "@testing-library/react";
import App from "../components/App";
import { firstRoute, secondRoute } from "../api";

describe("App", () => {
  it("should fetch routes", async () => {
    render(<App />);

    await Promise.all([firstRoute("Warszawa"), secondRoute("Poznań")]).then(
      (result) => {
        expect(result.length).toEqual(2);
      }
    );
  });
});
