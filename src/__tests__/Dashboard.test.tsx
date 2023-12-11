import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PersistentDrawerLeft from "../components/Dashboard";

describe("PersistentDrawerLeft", () => {
  test("renders the component", () => {
    render(
      <MemoryRouter>
        <PersistentDrawerLeft />
      </MemoryRouter>
    );
    // You can add more specific assertions based on your component's content
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("opens and closes the drawer", () => {
    render(
      <MemoryRouter>
        <PersistentDrawerLeft />
      </MemoryRouter>
    );

    // Drawer should be open by default
    expect(screen.getByText("Home")).toBeInTheDocument();

    // Clicking the close button should close the drawer
    fireEvent.click(screen.getByTestId("drawer-close-button"));
    expect(screen.queryByText("Home")).toBeNull();

    // Clicking the open button should open the drawer
    fireEvent.click(screen.getByTestId("drawer-open-button"));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("navigates to Home page on Home button click", () => {
    render(
      <MemoryRouter>
        <PersistentDrawerLeft />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Home"));

    // You should replace '/AdminLoginPage/AdminPage' with the actual route
    expect(window.location.pathname).toBe("/AdminLoginPage/AdminPage");
  });

  // Add more test cases for other functionalities as needed
});
