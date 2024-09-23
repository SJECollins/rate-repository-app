import { ScrollView, FlatList, Text } from "react-native";
import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({
    id,
    first: 3,
  });

  if (!repository) {
    return <Text>No repository found.</Text>;
  }

  onReachEnd = () => {
    console.log("End reached");
    fetchMore();
  };

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} myreview={false} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} singleRepo />
      )}
      onEndReached={onReachEnd}
      onEndReachedThreshold={0.5}
    />
    // <ScrollView>
    //   <RepositoryItem item={repository} singleRepo={true} />
    //   {reviews.map((review) => (
    //     <ReviewItem key={review.id} review={review} myreview={false} />
    //   ))}
    // </ScrollView>
  );
};

export default SingleRepository;
