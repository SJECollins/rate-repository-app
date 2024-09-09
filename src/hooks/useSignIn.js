import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({ variables: { username, password } });
      console.log(data);
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return [signIn, result];
};

export default useSignIn;
