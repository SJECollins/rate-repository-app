import React from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  search: {
    backgroundColor: theme.colors.white,
    margin: 10,
    padding: 20,
    height: 50,
    borderRadius: 5,
    borderColor: "gray",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      debouncedSearchKeyword: "",
    };
    this.debounceTimer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchKeyword !== this.state.searchKeyword) {
      this.debounceSearch();
    }
  }

  debounceSearch = () => {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.setState({ debouncedSearchKeyword: this.state.searchKeyword });
    }, 500);
  };

  handleSearchChange = (value) => {
    this.setState({ searchKeyword: value });
  };

  renderHeader = () => {
    return (
      <View>
        <TextInput
          style={styles.search}
          value={this.state.searchKeyword}
          onChangeText={this.handleSearchChange}
          placeholder="Search..."
        />
      </View>
    );
  };

  sortRepositories = (repositories, sortOption) => {
    switch (sortOption) {
      case "latest":
        return repositories;
      case "highest":
        return repositories.sort((a, b) => b.ratingAverage - a.ratingAverage);
      case "lowest":
        return repositories.sort((a, b) => a.ratingAverage - b.ratingAverage);
      default:
        return repositories;
    }
  };

  render() {
    const { repositories } = this.props;
    const { debouncedSearchKeyword } = this.state;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    const sortedRepositories = this.sortRepositories(
      [...repositoryNodes],
      "latest"
    );

    const filteredRepositories = sortedRepositories.filter((repo) =>
      repo.fullName.toLowerCase().includes(debouncedSearchKeyword.toLowerCase())
    );

    return (
      <FlatList
        data={filteredRepositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem item={item} singleRepo={false} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader()}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

export default RepositoryListContainer;
