import { render, screen } from "@testing-library/react-native";
import { NativeRouter } from "react-router-native";
import RepositoryItem from "../../components/RepositoryItem";

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
};

describe("RepositoryItem", () => {
  it("renders repository information correctly", () => {
    render(
      <NativeRouter>
        <RepositoryItem item={repository} singleRepo={false} />
      </NativeRouter>
    );
    expect(screen.getByText("jaredpalmer/formik")).toHaveTextContent(
      "jaredpalmer/formik"
    );
    expect(
      screen.getByText("Build forms in React, without the tears")
    ).toHaveTextContent("Build forms in React, without the tears");
    expect(screen.getByText("TypeScript")).toHaveTextContent("TypeScript");
    expect(screen.getByText("Stars")).toBeTruthy();
    expect(screen.getByText("33.9k")).toBeTruthy();
    expect(screen.getByText("Forks")).toBeTruthy();
    expect(screen.getByText("2.8k")).toBeTruthy();
    expect(screen.getByText("Reviews")).toBeTruthy();
    expect(screen.getByText("5")).toBeTruthy();
    expect(screen.getByText("Rating")).toBeTruthy();
    expect(screen.getByText("90")).toBeTruthy();
  });
});
