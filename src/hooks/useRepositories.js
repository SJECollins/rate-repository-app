import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      console.log("Repositories fetched");
    },
    onError: (error) => {
      console.error("Error fetching repositories:", error);
    },
  });

  if (error) {
    console.error("Error fetching repositories:", error);
    return { repositories: [], loading: false, refetch };
  }

  const repositories = data ? data.repositories : { edges: [] };

  return { repositories, loading, refetch };
};

export default useRepositories;
