import * as yup from "yup";
import { useFormik } from "formik";
import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
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
  repoOwner: "",
  repoName: "",
  rating: 0,
  review: "",
};

const validationSchema = yup.object().shape({
  repoOwner: yup.string().required("Repository owner's username is required"),
  repoName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  review: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { repoOwner, repoName, rating, review } = values;
      console.log(repoOwner, repoName, rating, review);
      try {
        const { data } = await createReview({
          variables: {
            repositoryName: repoName,
            ownerName: repoOwner,
            rating: Number(rating),
            text: review,
          },
        });
        navigate(`/${data.createReview.repositoryId}`);
      } catch (e) {
        if (e.graphQLErrors && e.graphQLErrors.length > 0) {
          const errorMessage = e.graphQLErrors[0].message;
          if (errorMessage.includes("repository")) {
            formik.setErrors({ repoName: errorMessage });
          }
        }
        console.log(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange("repoOwner")}
        value={formik.values.repoOwner}
        placeholder="Repository owner's username"
      />
      {formik.touched.repoOwner && formik.errors.repoOwner && (
        <Text style={styles.error}>{formik.errors.repoOwner}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange("repoName")}
        value={formik.values.repoName}
        placeholder="Repository name"
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={styles.error}>{formik.errors.repoName}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange("rating")}
        value={formik.values.rating}
        placeholder="Rating between 0 and 100"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={styles.textInput}
        onChangeText={formik.handleChange("review")}
        value={formik.values.review}
        multiline
        placeholder="Review"
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.error}>{formik.errors.review}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewForm;
