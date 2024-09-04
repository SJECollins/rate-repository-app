import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import StatItem from "./StatItem";
import theme from "../theme";

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
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.repo}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 5 }}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={{ paddingLeft: 20 }}>
          <Text fontWeight={"bold"}>{item.fullName}</Text>
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
    </View>
  );
};

export default RepositoryItem;
