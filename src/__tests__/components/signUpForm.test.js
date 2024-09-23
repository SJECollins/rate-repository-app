import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";
import SignUp from "../../components/SignUp";
import { useMutation } from "@apollo/client";
import useSignIn from "../../hooks/useSignIn";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useMutation: jest.fn(),
}));

jest.mock("../../hooks/useSignIn", () => jest.fn());

describe("SignUp", () => {
  describe("SignUpContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const mockMutate = jest.fn().mockResolvedValue({});
      const mockSignIn = jest.fn().mockResolvedValue({});
      const onSubmit = jest.fn();

      useMutation.mockReturnValue([mockMutate]);
      useSignIn.mockReturnValue([mockSignIn]);

      render(
        <NativeRouter>
          <SignUp onSignUp={onSubmit} />
        </NativeRouter>
      );

      fireEvent.changeText(
        screen.getByPlaceholderText("Username"),
        "testingUser"
      );
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.changeText(
        screen.getByPlaceholderText("Confirm password"),
        "password"
      );

      fireEvent.press(screen.getByText("Sign up"));

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledTimes(1);
        expect(mockMutate).toHaveBeenCalledWith({
          variables: {
            username: "testingUser",
            password: "password",
          },
        });

        expect(mockSignIn).toHaveBeenCalledTimes(1);
        expect(mockSignIn).toHaveBeenCalledWith({
          username: "testingUser",
          password: "password",
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});
