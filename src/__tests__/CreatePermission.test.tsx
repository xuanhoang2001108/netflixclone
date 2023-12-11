import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreatePermission from "../components/Admin/PermissionPage/CreatePermission";
import { Provider } from "react-redux";
import { store } from "../store/Store";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("CreatePermission component", () => {
  test("renders and submits the form correctly", async () => {
    // Mocking necessary dependencies or services (such as the mutation function)
    const mockAddPermissionMutation = jest.fn();
    jest.mock("../store/service/register.service", () => ({
      useAddPermissionMutation: () => [mockAddPermissionMutation],
    }));

    // Render the component
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            "/AdminLoginPage/AdminPage/PermissionPage/CreatePermission",
          ]}
        >
          <Routes>
            <Route
              path="/AdminLoginPage/AdminPage/PermissionPage/CreatePermission"
              element={<CreatePermission />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Interact with the form
    fireEvent.change(screen.getByLabelText("Permission Name"), {
      target: { value: "Sample Permission" },
    });
    fireEvent.change(screen.getByLabelText("Sort"), {
      target: { value: "42" },
    });
    fireEvent.click(screen.getByText("CREATE"));

    // Wait for the asynchronous code to finish (e.g., the mutation)
    await waitFor(() => {
      expect(mockAddPermissionMutation).toHaveBeenCalledWith({
        name: "Sample Permission",
        sort: 42,
        data: undefined,
      });
    });

    // Assert that the success toast is displayed
    expect(
      screen.getByText("Permission create successfully")
    ).toBeInTheDocument();

    // Mocking the navigate function from useNavigate
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

  });
});
