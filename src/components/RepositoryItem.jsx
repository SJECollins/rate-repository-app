import * as Linking from "expo-linking";
import { View, Image, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import StatItem from "./StatItem";
import theme from "../theme";
import useRepository from "../hooks/useRepository";
import { Link, useParams } from "react-router-native";

const styles = StyleSheet.create({
  repo: {
    backgroundColor: theme.colors.white,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
    marginBottom: 10,
    padding: 20,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    padding: 8,
    margin: 10,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  githubLink: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    padding: 8,
    margin: 10,
    borderRadius: 4,
    width: "100%",
    textAlign: "center",
  },
});

const RepositoryItem = ({ item, singleRepo }) => {
  const { id } = useParams();
  if (!item) {
    const data = useRepository({ id: id });
    if (!data.loading && !data.error) {
      item = data.repository;
    }

    if (data.loading) return <Text>Loading...</Text>;
    if (data.error) return <Text>Error: {item.error.message}</Text>;
  }

  console.log("Repo: ", item);
  console.log("Single repo: ", singleRepo);

  return (
    <View style={styles.repo} testID="repositoryItem">
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 5 }}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={{ paddingLeft: 20 }}>
          <Link to={`/${item.id}`}>
            <Text fontWeight={"bold"}>{item.fullName}</Text>
          </Link>
          <Text>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={theme.row}>
        <StatItem label="Stars" value={item.stargazersCount} />
        <StatItem label="Forks" value={item.forksCount} />
        <StatItem label="Reviews" value={item.reviewCount} />
        <StatItem label="Rating" value={item.ratingAverage} />
      </View>
      {singleRepo && (
        <>
          <Pressable onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.githubLink}>Open in GitHub</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default RepositoryItem;
