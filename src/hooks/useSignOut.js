import { GET_USER } from "../graphql/queries";
import { useApolloClient } from "@apollo/client";
import AuthStorage from "../utils/authStorage";

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signOut = async () => {
    try {
      const { data } = await apolloClient.query({ query: GET_USER });
      console.log(data);
      if (data.me) {
        await authStorage.removeAccessToken();
        await apolloClient.resetStore();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return signOut;
};

export default useSignOut;
