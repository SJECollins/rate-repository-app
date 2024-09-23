import { useNavigate } from "react-router-native";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

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
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be between 5 and 30 characters")
    .max(30, "Username must be between 5 and 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be between 5 and 50 characters")
    .max(50, "Password must be between 5 and 50 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUp = ({ onSignUp }) => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_USER);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        await mutate({
          variables: { username, password },
        });
        await signIn({ username, password });
        onSignUp();
        navigate("/");
      } catch (e) {
        if (e.graphQLErrors && e.graphQLErrors.length > 0) {
          const errorMessage = e.graphQLErrors[0].message;
          if (errorMessage.includes("Username")) {
            formik.setErrors({ username: errorMessage });
          }
          if (errorMessage.includes("Password")) {
            formik.setErrors({ password: errorMessage });
          }
        }
        console.log(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, formik.errors.username && styles.inputError]}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
      />
      {formik.errors.username ? (
        <Text style={styles.error}>{formik.errors.username}</Text>
      ) : null}
      <TextInput
        style={[styles.textInput, formik.errors.password && styles.inputError]}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      {formik.errors.password ? (
        <Text style={styles.error}>{formik.errors.password}</Text>
      ) : null}
      <TextInput
        style={[
          styles.textInput,
          formik.errors.confirmPassword && styles.inputError,
        ]}
        onChangeText={formik.handleChange("confirmPassword")}
        value={formik.values.confirmPassword}
        placeholder="Confirm password"
        secureTextEntry
      />
      {formik.errors.confirmPassword ? (
        <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
      ) : null}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
