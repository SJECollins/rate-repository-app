import { Text, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 10,
  },
});

const AppBarTab = ({ text }) => {
  return <Text style={styles.tab}>{text}</Text>;
};

export default AppBarTab;
