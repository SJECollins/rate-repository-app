import React from "react";
import { Text } from "react-native";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const { repositories, loading, fetchMore } = useRepositories({
    searchKeyword: "",
    first: 4,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const onEndReach = () => {
    fetchMore();
    console.log("You have reached the end of the list");
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
