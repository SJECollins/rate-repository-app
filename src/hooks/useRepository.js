import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
    onCompleted: () => {
      console.log("Repository fetched");
    },
    onError: (error) => {
      console.error("Error fetching repository:", error);
    },
  });

  if (error) {
    console.error("Error fetching repository:", error);
    return { repository: undefined, loading: false, error };
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data ? data.repository : undefined,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
