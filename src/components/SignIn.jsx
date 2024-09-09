import { useNavigate } from "react-router-native";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  textInput: {
    color: theme.colors.textSecondary,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 15,
    margin: 10,
    textAlign: "center",
    borderRadius: 5,
  },
  error: {
    color: theme.colors.error,
    textAlign: "center",
    fontWeight: theme.fontWeights.bold,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = ({ onSignIn }) => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        const data = await signIn({ username, password });
        if (data) {
          onSignIn();
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
