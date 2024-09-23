import { useMutation } from "@apollo/client";
import { FlatList, View, StyleSheet, Text, Alert } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_USER, variables: { includeReviews: true } }],
  });

  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
            } catch (e) {
              console.error(
                "Error details:",
                e.networkError?.result || e.message || e
              );
              console.log(e);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <View style={styles.container}>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ReviewItem
              review={item}
              myreview={true}
              handleDelete={() => handleDelete(item.id)}
            />
          )}
          keyExtractor={({ id }) => id}
        />
      ) : (
        <View>
          <Text>You haven't reviewed any repositories yet.</Text>
        </View>
      )}
    </View>
  );
};

export default MyReviews;
