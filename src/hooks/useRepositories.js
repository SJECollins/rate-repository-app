import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ searchKeyword, first }) => {
  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { searchKeyword, first },
      fetchPolicy: "cache-and-network",
      onCompleted: () => {
        console.log("Repositories fetched");
      },
      onError: (error) => {
        console.error("Error fetching repositories:", error);
      },
    }
  );

  if (error) {
    console.error("Error fetching repositories:", error);
    return { repositories: [], loading: false, refetch };
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        searchKeyword,
        first,
      },
    });
  };

  const repositories = data ? data.repositories : { edges: [] };

  return { repositories, fetchMore: handleFetchMore, loading, refetch };
};

export default useRepositories;
