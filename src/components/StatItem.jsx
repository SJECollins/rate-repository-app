import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  statItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const StatItem = ({ label, value }) => {
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value;
  };

  return (
    <View style={styles.statItem}>
      <Text fontWeight={"bold"}>{formatValue(value)}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default StatItem;
