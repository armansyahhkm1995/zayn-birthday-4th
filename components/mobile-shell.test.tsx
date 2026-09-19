import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileAppShell } from "./mobile-shell";

describe("MobileAppShell", () => {
  it("renders the app shell and children content", () => {
    render(
      <MobileAppShell>
        <div>Story begins</div>
      </MobileAppShell>,
    );

    expect(screen.getByText("Zayn Birthday 4th")).toBeInTheDocument();
    expect(screen.getByText("Story begins")).toBeInTheDocument();
  });
});
