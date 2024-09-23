import { View, Text, StyleSheet, Pressable } from "react-native";

import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  reviewItem: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    backgroundColor: theme.colors.white,
    marginBottom: 10,
  },
  review: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  reviewContainer: {
    flex: 1,
  },
  user: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  reviewText: {
    flex: 1,
    flexWrap: "wrap",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btn: {
    width: "40%",
  },
  btnText: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    padding: 8,
    margin: 10,
    borderRadius: 4,
    textAlign: "center",
  },
  deleteBtn: {
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    padding: 8,
    margin: 10,
    borderRadius: 4,
    textAlign: "center",
  },
});

const ReviewItem = ({ review, myreview, handleDelete }) => {
  console.log(review);
  const reviewDate = new Date(review.createdAt);
  return (
    <View style={styles.reviewItem}>
      <View style={styles.review}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewContainer}>
          {myreview ? (
            <Text style={styles.user}>{review.repository.fullName}</Text>
          ) : (
            <Text style={styles.user}>{review.user.username}</Text>
          )}
          <Text style={{ marginBottom: 10 }}>
            {reviewDate.toLocaleDateString()}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {myreview && (
        <View style={styles.buttons}>
          <Link to={"/:id"} style={styles.btn}>
            <Text style={styles.btnText}>View Repository</Text>
          </Link>
          <Pressable onPress={() => handleDelete(review.id)} style={styles.btn}>
            <Text style={styles.deleteBtn}>Delete Review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
