import { useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";

import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: theme.row.flexDirection,
  },
});

const AppBar = ({ isLoggedIn, onSignOut }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab text="Repositories" />
        </Link>

        {isLoggedIn ? (
          <Pressable onPress={onSignOut}>
            <AppBarTab text="Sign out" />
          </Pressable>
        ) : (
          <Link to="/signin">
            <AppBarTab text="Sign in" />
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
