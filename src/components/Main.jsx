import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import theme from "../theme";
import useAuthStorage from "../hooks/useAuthStorage";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authStorage = useAuthStorage();

  const checkLoggedInStatus = async () => {
    const accessToken = await authStorage.getAccessToken();
    setIsLoggedIn(!!accessToken);
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, [authStorage]);

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <AppBar isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignIn} />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
