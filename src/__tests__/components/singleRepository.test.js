import { render, screen } from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";
import SingleRepository from "../../components/SingleRepository";
import useRepository from "../../hooks/useRepository";

const repository = {
  id: "jaredpalmer.formik",
  fullName: "jaredpalmer/formik",
  description: "Build forms in React, without the tears",
  name: "formik",
  ownerName: "jaredpalmer",
  createdAd: "2018-10-30T21:24:03.000Z",
  url: "https://github.com/jaredpalmer/formik",
  ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
  stargazersCount: 33877,
  watchersCount: 33877,
  forksCount: 2784,
  ratingAverage: 90,
  reviewCount: 5,
  language: "TypeScript",
  reviews: {
    edges: [
      {
        node: {
          id: "jaredpalmer.formik-1",
          text: "This is a good library",
          rating: 90,
          createdAt: "2021-01-01T00:00:00.000Z",
          repositoryId: "jaredpalmer.formik",
          user: {
            id: "1",
            username: "leeroyjenkins",
          },
        },
        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
      },
    ],
  },
};

jest.mock("../../hooks/useRepository");

describe("SingleRepository", () => {
  it("renders repository information correctly", async () => {
    useRepository.mockReturnValue({
      repository: repository,
      fetchMore: jest.fn(),
    });

    render(
      <NativeRouter>
        <SingleRepository />
      </NativeRouter>
    );
    expect(screen.getByText("jaredpalmer/formik")).toHaveTextContent(
      "jaredpalmer/formik"
    );
    expect(
      screen.getByText("Build forms in React, without the tears")
    ).toHaveTextContent("Build forms in React, without the tears");
    expect(screen.getByText("TypeScript")).toHaveTextContent("TypeScript");

    expect(screen.getByText("This is a good library")).toBeTruthy();
    expect(screen.getByText("leeroyjenkins")).toBeTruthy();
  });

  it("shows 'No repository found.' when repository is not found", async () => {
    useRepository.mockReturnValue({
      repository: null,
      fetchMore: jest.fn(),
    });

    render(
      <NativeRouter>
        <SingleRepository />
      </NativeRouter>
    );
    expect(screen.getByText("No repository found.")).toBeTruthy();
  });
});
